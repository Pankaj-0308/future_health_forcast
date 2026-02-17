<<<<<<< HEAD
# 🏥 HealthAI Assistant - AI-Powered Symptom Analysis System

A comprehensive healthcare platform that transforms symptom descriptions into actionable health insights using advanced AI analysis.

## 🌟 Features

### 🔍 **Symptom Analysis**
- **AI-Powered Diagnosis**: Advanced symptom analysis with probability-based condition matching
- **Risk Assessment**: Visual risk scoring with color-coded severity indicators
- **Real-time Severity Detection**: Automatic detection of emergency symptoms
- **Comprehensive Evaluation**: Analysis of symptoms, duration, medical history, and lifestyle

### 🏥 **Hospital Finder**
- **Location-Based Search**: Find nearby medical facilities based on user location
- **Emergency Services**: Identify 24/7 emergency care centers
- **Specialty Matching**: Hospitals categorized by medical specialties
- **Distance Information**: Accurate distance calculations for quick access

### 📊 **Health Forecast**
- **Short-term Outlook**: 1-2 week health predictions
- **Medium-term Planning**: 1-3 month recovery timeline
- **Long-term Wellness**: 3+ month health projections
- **Prevention Strategies**: Personalized recommendations for future health

### ⚠️ **Emergency Detection**
- **Critical Warning System**: Automatic detection of life-threatening symptoms
- **Immediate Care Alerts**: Prominent warnings for emergency medical attention
- **Warning Signs Education**: Comprehensive list of emergency indicators
- **Quick Emergency Access**: Direct pathways to emergency services

### 📋 **Personalized Recommendations**
- **Immediate Actions**: Steps to take right now for symptom relief
- **Lifestyle Changes**: Long-term wellness improvements
- **Follow-up Care**: Professional medical consultation guidance
- **Prevention Tips**: Strategies to avoid future health issues

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (optional, for data persistence)
- Google Gemini API Key (for AI analysis)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd techsprint
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Environment Setup**
Create a `.env` file in the `server` directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/healthai
PORT=5000
```

5. **Start the application**
```bash
# Start server (in server directory)
npm start

# Start client (in client directory)
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 🏗️ Architecture

### Frontend (React + Vite)
```
client/src/
├── components/
│   ├── SymptomForm.jsx          # Patient input form
│   ├── HealthAnalysisResults.jsx # Results display
│   ├── HealthDisclaimer.jsx     # Medical disclaimer
│   ├── SymptomSeverityIndicator.jsx # Real-time severity detection
│   ├── Layout.jsx              # App layout
│   ├── Header.jsx               # Navigation header
│   └── Footer.jsx               # Footer component
├── pages/
│   ├── Home.jsx                 # Main landing page
│   ├── ResultsPage.jsx          # Analysis results
│   └── HealthForecastPage.jsx   # Health predictions
└── App.jsx                      # Main app component
```

### Backend (Node.js + Express)
```
server/
├── services/
│   ├── healthAiService.js      # AI analysis service
│   └── aiService.js            # Original AI service (legacy)
├── models/
│   ├── HealthAnalysis.js        # Health data model
│   └── Startup.js              # Original startup model (legacy)
├── server.js                    # Main server file
└── package.json                 # Dependencies
```

## 📡 API Endpoints

### Symptom Analysis
```http
POST /api/analyze-symptoms
Content-Type: application/json

{
  "patientName": "John Doe",
  "age": 25,
  "gender": "male",
  "location": "New York, NY",
  "symptoms": "Headache, fever, fatigue for 2 days...",
  "duration": "1-2 days",
  "medicalHistory": "No major illnesses",
  "lifestyle": "moderately active"
}
```

### Health Forecast
```http
POST /api/health-forecast
Content-Type: application/json

{
  "healthData": { /* patient data */ },
  "analysisResult": { /* previous analysis */ }
}
```

## 🤖 AI Integration

### Google Gemini AI
The system uses Google's Gemini AI for:
- **Symptom Analysis**: Pattern recognition and condition matching
- **Risk Assessment**: Probability-based health scoring
- **Forecast Generation**: Timeline predictions and recommendations
- **Emergency Detection**: Critical symptom identification

### Mock Mode
When no API key is provided, the system operates in mock mode with realistic sample data for testing.

## 🛡️ Safety & Disclaimer

### Medical Disclaimer
- **Not a Substitute for Professional Medical Advice**: This system is for informational purposes only
- **Emergency Situations**: Always call emergency services for life-threatening conditions
- **Professional Consultation**: Always consult qualified healthcare providers
- **Limitation of Liability**: The system is not responsible for medical decisions

### Data Privacy
- **No Personal Health Information Storage**: Patient data is processed anonymously
- **Secure API Communication**: All data transmission is encrypted
- **GDPR Compliance**: Follows data protection regulations
- **HIPAA Considerations**: Designed with healthcare privacy standards

## 🎨 UI/UX Features

### Design System
- **Modern Healthcare Theme**: Green and blue color palette
- **Accessibility**: WCAG 2.1 compliant design
- **Responsive Layout**: Mobile-first design approach
- **Micro-interactions**: Smooth animations and transitions

### User Experience
- **Progressive Disclosure**: Information revealed progressively
- **Visual Indicators**: Color-coded risk levels
- **Clear CTAs**: Prominent action buttons
- **Error Handling**: Comprehensive error states and recovery

## 🧪 Testing

### Manual Testing
1. **Symptom Input**: Test various symptom descriptions
2. **Emergency Detection**: Verify critical symptom alerts
3. **Hospital Finder**: Test location-based searches
4. **Forecast Generation**: Validate health predictions

### Automated Testing
```bash
# Run server tests
cd server && npm test

# Run client tests
cd client && npm test
```

## 📈 Performance

### Optimization
- **Lazy Loading**: Components loaded on demand
- **API Caching**: Response caching for improved performance
- **Image Optimization**: Compressed medical icons and graphics
- **Bundle Splitting**: Optimized JavaScript bundles

### Monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time monitoring
- **User Analytics**: Usage pattern analysis
- **Health Metrics**: System health monitoring

## 🔄 Future Enhancements

### Planned Features
- **Multi-language Support**: International language options
- **Voice Input**: Speech-to-text symptom description
- **Image Recognition**: Upload medical images for analysis
- **Integration APIs**: Connect with electronic health records
- **Mobile App**: Native iOS and Android applications
- **Video Consultation**: Telemedicine integration

### AI Improvements
- **Machine Learning**: Continuous model improvement
- **Specialty Models**: Domain-specific medical AI models
- **Drug Interactions**: Medication interaction checking
- **Genetic Factors**: Personalized medicine integration

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: ESLint and Prettier configuration
2. **Git Workflow**: Feature branch development
3. **Testing Requirements**: Unit tests for all components
4. **Documentation**: Comprehensive code documentation

### Pull Request Process
1. **Fork Repository**: Create personal fork
2. **Feature Branch**: Create descriptive branch name
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update relevant documentation
5. **Submit PR**: Detailed description of changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

### Contact Information
- **Technical Support**: support@healthai.com
- **Medical Questions**: consult@healthai.com
- **Emergency**: Call local emergency services

### Resources
- **Documentation**: [docs.healthai.com](https://docs.healthai.com)
- **API Reference**: [api.healthai.com](https://api.healthai.com)
- **Community Forum**: [forum.healthai.com](https://forum.healthai.com)

---

**⚠️ Important**: This system is not a substitute for professional medical advice. Always consult qualified healthcare providers for medical concerns and emergencies.
=======
# future_health_forcast


➡️ __Problem Statement:- (Theme: Health)__

Access to healthcare is still difficult for many differently-abled (Divyaang) individuals, especially in rural and underserved areas. Communication barriers, inaccessible health apps, and lack of continuous monitoring increase health risks and delay timely medical support.

-Deaf users struggle to communicate symptoms due to lack of sign-language and text-based tools.
-Visually impaired users cannot easily use health apps that lack voice guidance and accessible design.
-Chronic patients need continuous monitoring, but existing solutions are not inclusive.
-Rural communities face limited access to doctors and early diagnosis.
-Current systems do not combine accessibility with real-time health monitoring and risk prediction.

There is a strong need for an inclusive, AI-powered healthcare system that enables differently-abled individuals to monitor their health, report symptoms easily, and receive timely alerts without barriers.


➡️ __Proposed Solution:__

Divyaang Health AI is an inclusive healthcare platform designed to make health monitoring and medical support accessible for differently-abled individuals. By combining AI-powered diagnosis, wearable health tracking, and accessibility-focused design, the system helps users understand their health, receive early warnings, and access care without communication or usability barriers.

🟦How Our Solution Helps
-Accessible symptom reporting: Users can report symptoms using voice, text, or sign language input.
-Continuous health monitoring: Wearable devices track vital signs like heart rate, blood pressure, and oxygen levels.
-AI-based risk prediction: The system analyzes health data to provide early alerts and future health forecasts.
-Emergency support: Nearby hospitals can be located quickly, with voice navigation and vibration alerts for urgent situations.
-Inclusive design: High-contrast interface, large buttons, audio guidance, and haptic feedback ensure usability for all users.

Our goal is to empower Divyaang individuals to manage their health independently, reduce risks through early detection, and access timely medical care — regardless of physical or communication challenges.


➡️ __Project Proposal:__ Google Drive Link of Project Proposal is here->  ☑️ https://drive.google.com/file/d/1G4wgPxS7EZxVQySiraNhDDjpP8XYviJC/view?usp=drivesdk


➡️ __Presentation Video:__ Youtube Link of Presentation Video is here->  ☑️ 

>>>>>>> f0b7b6f51e99655a19faba8b43d6ebb5ba38c30a
