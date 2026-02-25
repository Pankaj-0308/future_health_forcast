"""
Train the vital-signs condition model on labeled data (CSV).
Multi-class: normal, hypertension, fever, tachycardia, hypertensive_crisis, possible_infection.
Uses HR, BP, and body temperature (Celsius).
"""
from __future__ import annotations

import csv
import json
import sys
from pathlib import Path

import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.features import FEATURE_NAMES, WINDOW_SIZE, build_windows_from_rows

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "vitals_labeled.csv"
MODEL_DIR = Path(__file__).resolve().parent.parent / "models"
MODEL_PATH = MODEL_DIR / "risk_model.joblib"
SCALER_PATH = MODEL_DIR / "scaler.joblib"
CONDITIONS_PATH = MODEL_DIR / "condition_names.json"

CONDITION_NAMES = [
    "normal",
    "hypertension",
    "fever",
    "tachycardia",
    "hypertensive_crisis",
    "possible_infection",
]


def load_csv(path: Path) -> list[dict]:
    rows: list[dict] = []
    with open(path, newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for row in r:
            rows.append({
                "user_id": row["user_id"],
                "timestamp_ms": int(row["timestamp_ms"]),
                "heart_rate": float(row["heart_rate"]),
                "systolic": float(row.get("systolic") or 0),
                "diastolic": float(row.get("diastolic") or 0),
                "temperature_celsius": float(row.get("temperature_celsius") or 0),
                "label": int(row["label"]),
            })
    return rows


def main() -> None:
    if not DATA_PATH.exists():
        print(f"Data not found: {DATA_PATH}")
        print("Run: python scripts/generate_training_data.py")
        sys.exit(1)

    print("Loading data...")
    all_rows = load_csv(DATA_PATH)
    all_rows.sort(key=lambda r: (r["user_id"], r["timestamp_ms"]))

    X_list: list[list[float]] = []
    y_list: list[int] = []

    from itertools import groupby
    for user_id, group in groupby(all_rows, key=lambda r: r["user_id"]):
        user_rows = list(group)
        X_u, y_u = build_windows_from_rows(user_rows, window_size=WINDOW_SIZE)
        X_list.extend(X_u)
        y_list.extend(y_u)

    X = np.array(X_list, dtype=np.float64)
    y = np.array(y_list, dtype=np.int32)
    np.nan_to_num(X, copy=False, nan=0.0, posinf=0.0, neginf=0.0)

    print(f"Total windows: {X.shape[0]}, features: {X.shape[1]}")
    for k in np.unique(y):
        name = CONDITION_NAMES[k] if k < len(CONDITION_NAMES) else f"class_{k}"
        print(f"  Class {k} ({name}): {np.sum(y == k)}")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s = scaler.transform(X_test)

    print("Training Random Forest (multi-class)...")
    clf = RandomForestClassifier(
        n_estimators=150,
        max_depth=14,
        min_samples_leaf=12,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1,
    )
    clf.fit(X_train_s, y_train)

    y_pred = clf.predict(X_test_s)
    print("\nConfusion matrix (test):")
    print(confusion_matrix(y_test, y_pred))
    print("\nClassification report (test):")
    target_names = [CONDITION_NAMES[i] if i < len(CONDITION_NAMES) else f"class_{i}" for i in sorted(np.unique(y))]
    print(classification_report(y_test, y_pred, target_names=target_names, zero_division=0))

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(clf, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    with open(CONDITIONS_PATH, "w", encoding="utf-8") as f:
        json.dump(CONDITION_NAMES, f, indent=2)
    print(f"\nSaved model to {MODEL_PATH}, scaler to {SCALER_PATH}, condition names to {CONDITIONS_PATH}")
    print("Feature names:", FEATURE_NAMES)


if __name__ == "__main__":
    main()
