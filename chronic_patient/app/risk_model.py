"""
Load trained condition model (multi-class) and run inference.
Inputs: heart rate, blood pressure, body temperature (Celsius).
Outputs: predicted condition and recommendation (e.g. "may be suffering from hypertension").
"""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np

from app.features import FEATURE_NAMES, WINDOW_SIZE, extract_features

MODEL_DIR = Path(__file__).resolve().parent.parent / "models"
MODEL_PATH = MODEL_DIR / "risk_model.joblib"
SCALER_PATH = MODEL_DIR / "scaler.joblib"
CONDITIONS_PATH = MODEL_DIR / "condition_names.json"

# Recommendations per condition (shown to user)
CONDITION_RECOMMENDATIONS = {
    "normal": "Your vitals look within normal range. Continue routine monitoring.",
    "hypertension": "Our model suggests you may be experiencing hypertension (elevated blood pressure). Rest, avoid salt and caffeine, and recheck in 15–30 minutes. If readings stay high, consult your doctor.",
    "fever": "Our model suggests you may have a fever. Rest, stay hydrated, and monitor your temperature. If it stays above 38.5°C or you feel very unwell, consider contacting your doctor.",
    "tachycardia": "Our model suggests elevated heart rate (tachycardia). Rest and avoid stimulants. If it persists or you have chest pain or shortness of breath, seek medical advice.",
    "hypertensive_crisis": "Our model suggests very high blood pressure (hypertensive crisis). This can be serious. Rest in a quiet place and seek medical attention promptly.",
    "possible_infection": "Our model suggests a possible infection (fever with elevated heart rate). Rest, stay hydrated, and monitor symptoms. If you have severe symptoms or worsening condition, contact your doctor.",
}


@dataclass
class RiskResult:
    at_risk_probability: float
    label: str
    condition_name: str
    message: str
    suggestion: str
    model_used: bool


def _load_condition_names() -> list[str]:
    if not CONDITIONS_PATH.exists():
        return ["normal", "hypertension", "fever", "tachycardia", "hypertensive_crisis", "possible_infection"]
    import json
    with open(CONDITIONS_PATH, encoding="utf-8") as f:
        return json.load(f)


def _load_model() -> tuple[Any, Any, list[str]] | None:
    if not MODEL_PATH.exists() or not SCALER_PATH.exists():
        return None
    import joblib
    clf = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    names = _load_condition_names()
    return clf, scaler, names


_model_cache: tuple[Any, Any, list[str]] | None = None


def get_model() -> tuple[Any, Any, list[str]] | None:
    global _model_cache
    if _model_cache is None:
        _model_cache = _load_model()
    return _model_cache


def predict_risk(
    heart_rates: list[float],
    systolic: list[float] | None = None,
    diastolic: list[float] | None = None,
    temperature_celsius: list[float] | None = None,
) -> RiskResult:
    """
    Predict condition from a window of readings (HR, BP, body temperature).
    Returns condition name and recommendation (e.g. "may be suffering from hypertension").
    """
    model_tuple = get_model()

    if model_tuple is None or len(heart_rates) < WINDOW_SIZE // 2:
        return RiskResult(
            at_risk_probability=0.0,
            label="normal",
            condition_name="normal",
            message="Insufficient readings or no trained model.",
            suggestion="Keep sending heart rate, blood pressure, and body temperature for analysis.",
            model_used=False,
        )

    clf, scaler, condition_names = model_tuple

    hr = heart_rates[-WINDOW_SIZE:] if len(heart_rates) > WINDOW_SIZE else heart_rates
    sys = systolic[-WINDOW_SIZE:] if systolic and len(systolic) >= len(hr) else None
    dia = diastolic[-WINDOW_SIZE:] if diastolic and len(diastolic) >= len(hr) else None
    temp = temperature_celsius[-WINDOW_SIZE:] if temperature_celsius and len(temperature_celsius) >= len(hr) else None

    if len(hr) < WINDOW_SIZE:
        mean_hr = sum(hr) / len(hr) if hr else 0
        hr = [mean_hr] * (WINDOW_SIZE - len(hr)) + hr
        if sys is not None:
            sys = [0.0] * (WINDOW_SIZE - len(sys)) + sys
        if dia is not None:
            dia = [0.0] * (WINDOW_SIZE - len(dia)) + dia
        if temp is not None:
            temp = [0.0] * (WINDOW_SIZE - len(temp)) + temp

    feats = extract_features(hr, sys, dia, temp)
    X = np.array([feats], dtype=np.float64)
    np.nan_to_num(X, copy=False, nan=0.0, posinf=0.0, neginf=0.0)
    X_s = scaler.transform(X)

    pred_class = int(clf.predict(X_s)[0])
    proba = clf.predict_proba(X_s)[0]
    classes = list(clf.classes_)
    pred_idx = classes.index(pred_class) if pred_class in classes else 0
    prob = float(proba[pred_idx])

    condition_name = condition_names[pred_class] if pred_class < len(condition_names) else "unknown"
    suggestion = CONDITION_RECOMMENDATIONS.get(
        condition_name,
        "Please monitor your vitals and consult a doctor if you have concerns.",
    )

    if pred_class == 0:
        message = "Your heart rate, blood pressure, and temperature look within normal ranges."
    else:
        message = f"Our model suggests you may be suffering from or experiencing: {condition_name.replace('_', ' ').title()}."

    return RiskResult(
        at_risk_probability=prob,
        label="at_risk" if pred_class != 0 else "normal",
        condition_name=condition_name,
        message=message,
        suggestion=suggestion,
        model_used=True,
    )
