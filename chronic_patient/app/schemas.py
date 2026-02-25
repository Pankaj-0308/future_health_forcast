from pydantic import BaseModel, Field


class ReadingIn(BaseModel):
    user_id: str = Field(..., description="User or device identifier")
    timestamp_ms: int | None = None
    heart_rate: float | None = Field(None, ge=30, le=250, description="Heart rate bpm")
    systolic: float | None = Field(None, ge=70, le=250, description="Systolic BP mmHg")
    diastolic: float | None = Field(None, ge=40, le=150, description="Diastolic BP mmHg")
    body_temperature_celsius: float | None = Field(None, ge=35.0, le=42.0, description="Body temperature in Celsius")


class ReportSummary(BaseModel):
    user_id: str
    period: str  # e.g. "last_24h", "last_7d"
    heart_rate: dict | None = None  # min, max, mean, count
    blood_pressure: dict | None = None
    temperature_celsius: dict | None = None  # min, max, mean, count
    readings_count: int = 0
    alerts_in_period: list[dict] = []


class AlertOut(BaseModel):
    kind: str
    message: str
    severity: str
    suggestion: str
    timestamp_ms: int
