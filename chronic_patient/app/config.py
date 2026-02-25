from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Optional: for push/email alerts later
    alert_webhook_url: str | None = None
    # How many readings to keep per user (e.g. 7 days at 15-min = 672)
    max_readings_per_user: int = 1000

    class Config:
        env_file = ".env"


settings = Settings()
