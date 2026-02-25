# Training data for the vital-signs condition model

## Expected format (for real data)

Use one CSV file with these columns (order can vary; names must match):

| Column                 | Type   | Description |
|------------------------|--------|-------------|
| `user_id`              | string | Patient or user identifier |
| `timestamp_ms`         | int    | Unix time in milliseconds |
| `heart_rate`           | float  | Heart rate (bpm), 30–250 |
| `systolic`             | float  | Systolic BP (mmHg) |
| `diastolic`            | float  | Diastolic BP (mmHg) |
| `temperature_celsius`   | float  | Body temperature (°C), 35–42 |
| `label`                | int    | **0** = normal, **1** = hypertension, **2** = fever, **3** = tachycardia, **4** = hypertensive_crisis, **5** = possible_infection |

**Label meaning (multi-class):**

- **0** Normal – vitals within normal range
- **1** Hypertension – elevated blood pressure
- **2** Fever – elevated body temperature
- **3** Tachycardia – elevated heart rate
- **4** Hypertensive crisis – very high blood pressure
- **5** Possible infection – fever with elevated heart rate

Put the file at `data/vitals_labeled.csv`, then run:

```bash
python -m app.train
```

## Synthetic data

`scripts/generate_training_data.py` generates synthetic data with HR, BP, and body temperature and the labels above. Use it to train the model; replace with real labeled data when available for better accuracy.
