"""
Pattern detection on continuous vital signs.
Uses rolling windows; alerts on sustained/trend patterns, not single spikes.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

import pandas as pd


@dataclass
class PatternResult:
    kind: Literal["normal", "sustained_high_hr", "sustained_high_bp", "rising_trend_hr", "rising_trend_bp"]
    message: str
    severity: Literal["info", "warning", "alert"]
    suggestion: str


# Conservative thresholds (adjust per user or use personal baseline later)
HR_RESTING_HIGH = 100  # bpm
SYSTOLIC_HIGH = 140    # mmHg
DIASTOLIC_HIGH = 90    # mmHg
MIN_READINGS_FOR_SUSTAINED = 3
TREND_WINDOW_HOURS = 2


def _ensure_series(df: pd.DataFrame, value_col: str, time_col: str = "timestamp_ms") -> pd.Series:
    if df.empty or len(df) < 2:
        return pd.Series(dtype=float)
    df = df.sort_values(time_col)
    ts = pd.to_datetime(df[time_col], unit="ms", errors="coerce")
    return pd.Series(df[value_col].values, index=ts).dropna()


def check_sustained_high(series: pd.Series, threshold: float, min_count: int = MIN_READINGS_FOR_SUSTAINED) -> bool:
    """True if at least min_count of recent readings are above threshold."""
    if series.empty or len(series) < min_count:
        return False
    recent = series.tail(min_count * 2)  # look at last N*2 to get at least N above
    above = (recent >= threshold).sum()
    return above >= min_count


def check_rising_trend(series: pd.Series, window_minutes: int = 60) -> bool:
    """True if recent values are clearly higher than earlier in window."""
    if series.empty or len(series) < 4:
        return False
    recent = series.tail(20)
    if len(recent) < 4:
        return False
    first_half = recent.head(len(recent) // 2).mean()
    second_half = recent.tail(len(recent) // 2).mean()
    return second_half > first_half and (second_half - first_half) >= 5  # at least 5 unit increase


def detect_patterns(
    heart_rates: list[float],
    systolic: list[float] | None = None,
    diastolic: list[float] | None = None,
    timestamps_ms: list[int] | None = None,
) -> list[PatternResult]:
    """
    Run pattern detection on the latest window of readings.
    Returns list of detected patterns (can be empty = normal).
    """
    results: list[PatternResult] = []
    now_ms = timestamps_ms[-1] if timestamps_ms else 0
    n = len(heart_rates)
    if n < MIN_READINGS_FOR_SUSTAINED:
        return results

    if timestamps_ms is None:
        timestamps_ms = [now_ms - (n - 1 - i) * 900_000 for i in range(n)]  # assume 15-min apart

    df_hr = pd.DataFrame({"timestamp_ms": timestamps_ms, "value": heart_rates})
    hr_series = _ensure_series(df_hr, "value")

    # Sustained high HR
    if check_sustained_high(hr_series, HR_RESTING_HIGH):
        results.append(
            PatternResult(
                kind="sustained_high_hr",
                message="Sustained elevated heart rate detected over recent readings.",
                severity="warning",
                suggestion="Rest and recheck in 10–15 minutes. If it continues or you have symptoms (chest pain, shortness of breath), consider contacting your doctor.",
            )
        )

    # Rising trend HR
    if check_rising_trend(hr_series):
        results.append(
            PatternResult(
                kind="rising_trend_hr",
                message="Heart rate has been trending up over the last period.",
                severity="info",
                suggestion="Take a break if you're active. If at rest, recheck in 15 minutes.",
            )
        )

    # BP if provided
    if systolic and diastolic and len(systolic) >= MIN_READINGS_FOR_SUSTAINED and len(diastolic) >= MIN_READINGS_FOR_SUSTAINED:
        ts_bp = timestamps_ms[-len(systolic):] if len(timestamps_ms) >= len(systolic) else timestamps_ms
        df_sys = pd.DataFrame({"timestamp_ms": ts_bp[: len(systolic)], "value": systolic})
        df_dia = pd.DataFrame({"timestamp_ms": ts_bp[: len(diastolic)], "value": diastolic})
        sys_series = _ensure_series(df_sys, "value")
        dia_series = _ensure_series(df_dia, "value")
        if check_sustained_high(sys_series, SYSTOLIC_HIGH) or check_sustained_high(dia_series, DIASTOLIC_HIGH):
            results.append(
                PatternResult(
                    kind="sustained_high_bp",
                    message="Sustained elevated blood pressure over recent readings.",
                    severity="warning",
                    suggestion="Rest and avoid caffeine/salt. Recheck in 15–30 minutes. If repeatedly high, discuss with your doctor.",
                )
            )
        if check_rising_trend(sys_series) or check_rising_trend(dia_series):
            results.append(
                PatternResult(
                    kind="rising_trend_bp",
                    message="Blood pressure has been trending up.",
                    severity="info",
                    suggestion="Rest and recheck later. If this happens often, mention it to your doctor.",
                )
            )

    return results
