"""
Feature extraction from a window of vital-sign readings.
Must match exactly between training and inference.
"""
from __future__ import annotations

import math
from typing import Any

import numpy as np


# Window size used in training and inference (number of readings)
WINDOW_SIZE = 24  # e.g. 24 x 15 min = 6 hours

FEATURE_NAMES = [
    "hr_mean", "hr_std", "hr_max", "hr_min", "hr_trend", "hr_above_100_pct",
    "sys_mean", "sys_std", "sys_max", "sys_min", "sys_trend",
    "dia_mean", "dia_std", "dia_max", "dia_min", "dia_trend",
    "temp_mean", "temp_std", "temp_max", "temp_min", "temp_trend", "temp_above_37_5_pct",
    "n_readings",
]


def _safe_mean(arr: list[float]) -> float:
    if not arr:
        return 0.0
    return float(np.mean(arr))


def _safe_std(arr: list[float]) -> float:
    if len(arr) < 2:
        return 0.0
    return float(np.std(arr))


def _trend_slope(values: list[float]) -> float:
    """Linear regression slope (per reading index)."""
    if len(values) < 3:
        return 0.0
    n = len(values)
    x = np.arange(n, dtype=float)
    y = np.array(values, dtype=float)
    xm = x.mean()
    ym = y.mean()
    num = ((x - xm) * (y - ym)).sum()
    den = ((x - xm) ** 2).sum()
    if den == 0:
        return 0.0
    return float(num / den)


def extract_features(
    heart_rates: list[float],
    systolic: list[float] | None = None,
    diastolic: list[float] | None = None,
    temperature_celsius: list[float] | None = None,
) -> list[float]:
    """
    Extract a fixed-size feature vector from one window of readings.
    Used in training and inference. Missing BP/temp is filled with 0 (model must be trained with same).
    """
    n = len(heart_rates)
    if n == 0:
        return [0.0] * len(FEATURE_NAMES)

    hr = heart_rates
    sys = systolic if systolic and len(systolic) >= n else [0.0] * n
    dia = diastolic if diastolic and len(diastolic) >= n else [0.0] * n
    temp = temperature_celsius if temperature_celsius and len(temperature_celsius) >= n else [0.0] * n
    if len(sys) > n:
        sys = sys[-n:]
    if len(dia) > n:
        dia = dia[-n:]
    if len(temp) > n:
        temp = temp[-n:]
    if len(sys) < n:
        sys = [0.0] * (n - len(sys)) + sys
    if len(dia) < n:
        dia = [0.0] * (n - len(dia)) + dia
    if len(temp) < n:
        temp = [0.0] * (n - len(temp)) + temp

    hr_above_100 = sum(1 for v in hr if v >= 100)
    hr_above_100_pct = hr_above_100 / n if n else 0.0

    temp_ok = [v for v in temp if v > 0]
    temp_above_37_5 = sum(1 for v in temp_ok if v >= 37.5)
    temp_above_37_5_pct = (temp_above_37_5 / len(temp_ok)) if temp_ok else 0.0

    sys_ok = [v for v in sys if v > 0]
    dia_ok = [v for v in dia if v > 0]

    return [
        _safe_mean(hr),
        _safe_std(hr),
        max(hr) if hr else 0.0,
        min(hr) if hr else 0.0,
        _trend_slope(hr),
        hr_above_100_pct,
        _safe_mean(sys_ok) if sys_ok else 0.0,
        _safe_std(sys_ok) if len(sys_ok) >= 2 else 0.0,
        max(sys_ok) if sys_ok else 0.0,
        min(sys_ok) if sys_ok else 0.0,
        _trend_slope(sys) if sys_ok else 0.0,
        _safe_mean(dia_ok) if dia_ok else 0.0,
        _safe_std(dia_ok) if len(dia_ok) >= 2 else 0.0,
        max(dia_ok) if dia_ok else 0.0,
        min(dia_ok) if dia_ok else 0.0,
        _trend_slope(dia) if dia_ok else 0.0,
        _safe_mean(temp_ok) if temp_ok else 0.0,
        _safe_std(temp_ok) if len(temp_ok) >= 2 else 0.0,
        max(temp_ok) if temp_ok else 0.0,
        min(temp_ok) if temp_ok else 0.0,
        _trend_slope(temp) if temp_ok else 0.0,
        temp_above_37_5_pct,
        float(n),
    ]


def build_windows_from_rows(
    rows: list[dict[str, Any]],
    window_size: int = WINDOW_SIZE,
) -> tuple[list[list[float]], list[int]]:
    """
    From a chronologically ordered list of reading dicts (with heart_rate, systolic, diastolic, label),
    build overlapping windows and labels. Label for window = max(label in window).
    Returns (list of feature vectors, list of labels).
    """
    X: list[list[float]] = []
    y: list[int] = []

    for i in range(len(rows) - window_size + 1):
        window = rows[i : i + window_size]
        hr = [r["heart_rate"] for r in window if r.get("heart_rate") is not None]
        if len(hr) < window_size // 2:
            continue
        sys = [r.get("systolic") or 0 for r in window]
        dia = [r.get("diastolic") or 0 for r in window]
        temp = [r.get("temperature_celsius") or 0 for r in window]
        labels = [r.get("label", 0) for r in window]
        label = max(labels)
        hr_mean = sum(hr) / len(hr) if hr else 0
        hr_filled = [r.get("heart_rate") or hr_mean for r in window]
        feats = extract_features(hr_filled, sys, dia, temp)
        X.append(feats)
        y.append(label)

    return X, y
