"""
Simple in-memory storage for readings. Replace with DB (e.g. SQLite/Postgres) for production.
"""
from __future__ import annotations

from collections import defaultdict
from typing import Any

from app.config import settings

# user_id -> list of { timestamp_ms, heart_rate, systolic?, diastolic? }, newest last
_readings: dict[str, list[dict[str, Any]]] = defaultdict(list)


def add_reading(user_id: str, payload: dict[str, Any]) -> None:
    row = {
        "timestamp_ms": payload.get("timestamp_ms") or _now_ms(),
        "heart_rate": payload.get("heart_rate"),
        "systolic": payload.get("systolic"),
        "diastolic": payload.get("diastolic"),
        "temperature_celsius": payload.get("body_temperature_celsius"),
    }
    _readings[user_id].append(row)
    # Keep only last N
    max_n = settings.max_readings_per_user
    if len(_readings[user_id]) > max_n:
        _readings[user_id] = _readings[user_id][-max_n:]


def get_readings(
    user_id: str,
    limit: int | None = None,
    since_ms: int | None = None,
) -> list[dict[str, Any]]:
    out = list(_readings[user_id])
    if since_ms is not None:
        out = [r for r in out if (r.get("timestamp_ms") or 0) >= since_ms]
    if limit is not None:
        out = out[-limit:]
    return out


def _now_ms() -> int:
    import time
    return int(time.time() * 1000)
