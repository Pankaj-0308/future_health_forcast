<<<<<<< HEAD
# 🏥 HealthAI Assistant - AI-Powered Symptom Analysis System


✅ One-Click Setup (For chronic_patient)
🔹 1. Open PowerShell
Press:

Windows + R → type powershell → Enter
🔹 2. Go to project folder
cd C:\chronic_patient
🔹 3. Create virtual environment
python -m venv .venv
🔹 4. Activate it
.\.venv\Scripts\activate

You should see:

(.venv)
🔹 5. Install everything (single paste)
pip install --upgrade pip
pip install fastapi "uvicorn[standard]" numpy scikit-learn joblib pydantic-settings
🔹 6. Train model (run once)
python scripts/generate_training_data.py
python app/train.py
🔹 7. Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
🔹 8. Open browser

Paste:

http://localhost:8000




➡️ __Problem Statement:- (Theme: Health)__

Access to healthcare is still difficult for many differently-abled (Divyaang) individuals, especially in rural and underserved areas. Communication barriers, inaccessible health apps, and lack of continuous monitoring increase health risks and delay timely medical support.

-**Deaf users struggle to communicate symptoms due to lack of sign-language and text-based tools.**
-**Visually impaired users cannot easily use health apps that lack voice guidance and accessible design.**
-**Chronic patients need continuous monitoring, but existing solutions are not inclusive.**
-**Rural communities face limited access to doctors and early diagnosis.**
-**Current systems do not combine accessibility with real-time health monitoring and risk prediction.**

There is a strong need for an inclusive, AI-powered healthcare system that enables differently-abled individuals to monitor their health, report symptoms easily, and receive timely alerts without barriers.


➡️ __Proposed Solution:__

Divyaang Health AI is an inclusive healthcare platform designed to make health monitoring and medical support accessible for differently-abled individuals. By combining AI-powered diagnosis, wearable health tracking, and accessibility-focused design, the system helps users understand their health, receive early warnings, and access care without communication or usability barriers.

🟦How Our Solution Helps
-**Accessible symptom reporting:** Users can report symptoms using voice, text, or sign language input.
-**Continuous health monitoring:** Wearable devices track vital signs like heart rate, blood pressure, and oxygen levels.
-**AI-based risk prediction:** The system analyzes health data to provide early alerts and future health forecasts.
-**Emergency support:** Nearby hospitals can be located quickly, with voice navigation and vibration alerts for urgent situations.
-**Inclusive design:** High-contrast interface, large buttons, audio guidance, and haptic feedback ensure usability for all users.

Our goal is to empower Divyaang individuals to manage their health independently, reduce risks through early detection, and access timely medical care — regardless of physical or communication challenges.


➡️ __Project Proposal:__ Google Drive Link of Project Proposal is here->  ☑️ https://drive.google.com/file/d/1G4wgPxS7EZxVQySiraNhDDjpP8XYviJC/view?usp=drivesdk


➡️ __Presentation Video:__ Youtube Link of Presentation Video is here->  ☑️ https://drive.google.com/file/d/12NrXDUg_hhQ_-LpFj4O_gKjijREqsQwN/view?usp=drivesdk

