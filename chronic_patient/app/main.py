"""
API: ingest readings from watch, reports, and alerts.
"""
from __future__ import annotations

import time
from typing import Any

from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.pattern_detector import detect_patterns
from app.risk_model import predict_risk
from app.schemas import ReadingIn, ReportSummary, AlertOut
from app import storage

app = FastAPI(
    title="Chronic Patient – Watch vitals",
    description="Ingest continuous vitals from your watch; get reports and alerts.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve dashboard UI
STATIC_DIR = Path(__file__).resolve().parent.parent / "static"
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# In-memory list of alerts we've already sent (to avoid spam). Key = (user_id, pattern_kind, window_start_ms)
_sent_alerts: set[tuple[str, str, int]] = set()
ALERT_DEBOUNCE_MS = 45 * 60 * 1000  # don't re-alert same pattern for 45 min


def _now_ms() -> int:
    return int(time.time() * 1000)


@app.post("/api/readings")
def post_reading(body: ReadingIn) -> dict[str, Any]:
    """Receive a single reading from your watch (via app or Shortcut). Call this every 10–15 min."""
    if body.heart_rate is None and body.systolic is None and body.body_temperature_celsius is None:
        raise HTTPException(400, "At least one of heart_rate, systolic/diastolic, or body_temperature_celsius required")
    payload = body.model_dump(exclude_none=True)
    storage.add_reading(body.user_id, payload)

    # Latest window for model and/or rule-based logic
    readings = storage.get_readings(body.user_id, limit=48)
    hr = [r["heart_rate"] for r in readings if r.get("heart_rate") is not None]
    ts = [r["timestamp_ms"] for r in readings if r.get("timestamp_ms")]
    sys = [r["systolic"] for r in readings if r.get("systolic") is not None]
    dia = [r["diastolic"] for r in readings if r.get("diastolic") is not None]
    temp = [r["temperature_celsius"] for r in readings if r.get("temperature_celsius") is not None]

    # Prefer trained ML model (data-driven); fallback to rule-based pattern detection
    risk = predict_risk(heart_rates=hr, systolic=sys or None, diastolic=dia or None, temperature_celsius=temp or None)
    patterns_from_rules = detect_patterns(
        heart_rates=hr, systolic=sys or None, diastolic=dia or None, timestamps_ms=ts or None
    )

    alerts_this_time: list[dict] = []
    window_key = (ts[-len(hr)] if ts and hr else 0) if ts else 0

    if risk.model_used and risk.label == "at_risk":
        key = (body.user_id, "ml_at_risk", (window_key // ALERT_DEBOUNCE_MS) * ALERT_DEBOUNCE_MS)
        if key not in _sent_alerts:
            _sent_alerts.add(key)
            alerts_this_time.append({
                "kind": "ml_at_risk",
                "condition_name": risk.condition_name,
                "message": risk.message,
                "severity": "warning",
                "suggestion": risk.suggestion,
                "timestamp_ms": _now_ms(),
                "at_risk_probability": round(risk.at_risk_probability, 3),
            })
            if settings.alert_webhook_url:
                try:
                    import urllib.request
                    import json
                    req = urllib.request.Request(
                        settings.alert_webhook_url,
                        data=json.dumps({"user_id": body.user_id, "alert": alerts_this_time[-1]}).encode(),
                        headers={"Content-Type": "application/json"},
                        method="POST",
                    )
                    urllib.request.urlopen(req, timeout=5)
                except Exception:
                    pass
    else:
        # Fallback: rule-based patterns when no model or model says normal
        for p in patterns_from_rules:
            key = (body.user_id, p.kind, (window_key // ALERT_DEBOUNCE_MS) * ALERT_DEBOUNCE_MS)
            if key not in _sent_alerts and p.severity in ("warning", "alert"):
                _sent_alerts.add(key)
                alerts_this_time.append({
                    "kind": p.kind,
                    "message": p.message,
                    "severity": p.severity,
                    "suggestion": p.suggestion,
                    "timestamp_ms": _now_ms(),
                })
                if settings.alert_webhook_url:
                    try:
                        import urllib.request
                        import json
                        req = urllib.request.Request(
                            settings.alert_webhook_url,
                            data=json.dumps({"user_id": body.user_id, "alert": alerts_this_time[-1]}).encode(),
                            headers={"Content-Type": "application/json"},
                            method="POST",
                        )
                        urllib.request.urlopen(req, timeout=5)
                    except Exception:
                        pass

    return {
        "ok": True,
        "readings_stored": len(readings),
        "model": {
            "used": risk.model_used,
            "at_risk_probability": round(risk.at_risk_probability, 3),
            "label": risk.label,
            "condition_name": risk.condition_name,
        },
        "patterns_detected": [{"kind": p.kind, "message": p.message, "suggestion": p.suggestion} for p in patterns_from_rules],
        "alerts_triggered": alerts_this_time,
    }


@app.get("/api/reports/{user_id}", response_model=ReportSummary)
def get_report(user_id: str, period: str = "last_24h") -> ReportSummary:
    """Get a summary report for the user (last 24h or last_7d)."""
    now = _now_ms()
    if period == "last_7d":
        since = now - 7 * 24 * 60 * 60 * 1000
        limit = 1000
    else:
        since = now - 24 * 60 * 60 * 1000
        limit = 200
    readings = storage.get_readings(user_id, limit=limit, since_ms=since)

    hr_values = [r["heart_rate"] for r in readings if r.get("heart_rate") is not None]
    sys_values = [r["systolic"] for r in readings if r.get("systolic") is not None]
    dia_values = [r["diastolic"] for r in readings if r.get("diastolic") is not None]
    temp_values = [r["temperature_celsius"] for r in readings if r.get("temperature_celsius") is not None]

    def stats(vals: list[float]) -> dict[str, float] | None:
        if not vals:
            return None
        return {"min": min(vals), "max": max(vals), "mean": round(sum(vals) / len(vals), 1), "count": len(vals)}

    bp = None
    if sys_values and dia_values:
        bp = {"systolic": stats(sys_values), "diastolic": stats(dia_values)}
    temp_stats = stats(temp_values) if temp_values else None

    return ReportSummary(
        user_id=user_id,
        period=period,
        heart_rate=stats(hr_values),
        blood_pressure=bp,
        temperature_celsius=temp_stats,
        readings_count=len(readings),
        alerts_in_period=[],
    )


@app.get("/api/alerts/{user_id}")
def get_alerts(user_id: str, limit: int = 20) -> list[AlertOut]:
    """Return recent alerts for the user (from pattern detection). For now returns last triggered; persist in DB for real history."""
    return []


@app.get("/api/dashboard/{user_id}")
def get_dashboard(user_id: str, period: str = "last_24h") -> dict[str, Any]:
    """Full dashboard: report + model analysis + what the user should do."""
    now = _now_ms()
    if period == "last_7d":
        since = now - 7 * 24 * 60 * 60 * 1000
        limit = 1000
    else:
        since = now - 24 * 60 * 60 * 1000
        limit = 200
    readings = storage.get_readings(user_id, limit=limit, since_ms=since)

    hr_values = [r["heart_rate"] for r in readings if r.get("heart_rate") is not None]
    sys_values = [r["systolic"] for r in readings if r.get("systolic") is not None]
    dia_values = [r["diastolic"] for r in readings if r.get("diastolic") is not None]
    temp_values = [r["temperature_celsius"] for r in readings if r.get("temperature_celsius") is not None]

    def stats(vals: list[float]) -> dict[str, float] | None:
        if not vals:
            return None
        return {"min": min(vals), "max": max(vals), "mean": round(sum(vals) / len(vals), 1), "count": len(vals)}

    heart_rate = stats(hr_values)
    blood_pressure = None
    if sys_values and dia_values:
        blood_pressure = {"systolic": stats(sys_values), "diastolic": stats(dia_values)}
    temperature_celsius = stats(temp_values) if temp_values else None

    # Run model on latest window (same as POST logic)
    readings_window = storage.get_readings(user_id, limit=48)
    hr = [r["heart_rate"] for r in readings_window if r.get("heart_rate") is not None]
    ts = [r["timestamp_ms"] for r in readings_window if r.get("timestamp_ms")]
    sys = [r["systolic"] for r in readings_window if r.get("systolic") is not None]
    dia = [r["diastolic"] for r in readings_window if r.get("diastolic") is not None]
    temp = [r["temperature_celsius"] for r in readings_window if r.get("temperature_celsius") is not None]
    risk = predict_risk(heart_rates=hr, systolic=sys or None, diastolic=dia or None, temperature_celsius=temp or None)
    patterns = detect_patterns(
        heart_rates=hr, systolic=sys or None, diastolic=dia or None, timestamps_ms=ts or None
    )

    # What the user should do
    suggestion = risk.suggestion
    if risk.label == "at_risk":
        action_priority = "important"
        action_message = risk.message
    elif patterns:
        p = patterns[0]
        action_priority = "info" if p.severity == "info" else "warning"
        action_message = p.message
        suggestion = suggestion or p.suggestion
    else:
        action_priority = "normal"
        action_message = risk.message if risk.model_used else "Keep sending readings for analysis."

    return {
        "user_id": user_id,
        "period": period,
        "report": {
            "heart_rate": heart_rate,
            "blood_pressure": blood_pressure,
            "temperature_celsius": temperature_celsius,
            "readings_count": len(readings),
        },
        "analysis": {
            "model_used": risk.model_used,
            "label": risk.label,
            "condition_name": risk.condition_name,
            "at_risk_probability": round(risk.at_risk_probability, 3),
            "message": risk.message,
        },
        "action": {
            "priority": action_priority,
            "message": action_message,
            "suggestion": suggestion,
        },
        "patterns": [{"kind": p.kind, "message": p.message, "suggestion": p.suggestion} for p in patterns],
        "series": {
            "timestamps_ms": [r["timestamp_ms"] for r in readings],
            "heart_rate": [r.get("heart_rate") for r in readings],
            "systolic": [r.get("systolic") for r in readings],
            "diastolic": [r.get("diastolic") for r in readings],
            "temperature_celsius": [r.get("temperature_celsius") for r in readings],
        },
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/")
@app.get("/dashboard")
def overview_page() -> FileResponse:
    """Serve the overview dashboard UI."""
    index_path = STATIC_DIR / "index.html"
    if not index_path.exists():
        raise HTTPException(404, "Overview page not found. Create static/index.html")
    return FileResponse(index_path)


@app.get("/trends")
def trends_page() -> FileResponse:
    """Serve the trends page."""
    path = STATIC_DIR / "trends.html"
    if not path.exists():
        raise HTTPException(404, "Trends page not found. Create static/trends.html")
    return FileResponse(path)


@app.get("/insights")
def insights_page() -> FileResponse:
    """Serve the insights page."""
    path = STATIC_DIR / "insights.html"
    if not path.exists():
        raise HTTPException(404, "Insights page not found. Create static/insights.html")
    return FileResponse(path)


@app.get("/about")
def about_page() -> FileResponse:
    """Serve the about page."""
    path = STATIC_DIR / "about.html"
    if not path.exists():
        raise HTTPException(404, "About page not found. Create static/about.html")
    return FileResponse(path)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
