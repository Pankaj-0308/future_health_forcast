const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize with check for placeholder key
let genAI = null;
try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.trim().length > 0) {
        genAI = new GoogleGenerativeAI(apiKey);
        console.log('✅ Google Generative AI initialized for Health Analysis');
    } else {
        console.log('⚠️ Using MOCK data mode - no valid API key');
    }
} catch (err) {
    console.log('⚠️ Could not initialize AI - using MOCK mode');
}

// Mock data for symptom analysis
const mockSymptomAnalysis = {
    symptom_analysis: {
        possible_conditions: [
            {
                name: "Common Cold",
                probability: 75,
                description: "Viral infection of the upper respiratory tract causing sore throat, runny nose, and fatigue."
            },
            {
                name: "Seasonal Allergies",
                probability: 45,
                description: "Immune system reaction to airborne substances like pollen, causing similar symptoms."
            },
            {
                name: "Sinus Infection",
                probability: 30,
                description: "Inflammation of the sinus cavities, often following a cold or allergic reaction."
            }
        ],
        key_symptoms: [
            "Headache and sinus pressure",
            "Sore throat and cough",
            "Fatigue and mild fever",
            "Nasal congestion"
        ]
    },
    risk_assessment: {
        overall_risk_score: 25,
        risk_factors: [
            "Recent exposure to viral infections",
            "Seasonal allergy history",
            "Stress and fatigue"
        ]
    },
    health_trends: {
        short_term: "Symptoms expected to peak in 2-3 days with proper rest and hydration.",
        medium_term: "Gradual improvement over 1-2 weeks with supportive care.",
        long_term: "Full recovery expected within 3 weeks. Consider allergy testing if symptoms persist."
    },
    recommendations: {
        immediate: [
            "Get adequate rest and sleep (8+ hours)",
            "Stay hydrated with warm fluids and water",
            "Use over-the-counter pain relievers for discomfort",
            "Monitor temperature twice daily"
        ],
        lifestyle: [
            "Increase vitamin C intake through fruits",
            "Practice stress reduction techniques",
            "Maintain regular sleep schedule",
            "Avoid alcohol and smoking"
        ],
        follow_up: [
            "Consult primary care physician if fever persists >3 days",
            "Consider allergy testing if symptoms recur seasonally",
            "Annual flu vaccination recommended",
            "Regular health check-ups"
        ]
    },
    nearby_hospitals: [
        {
            name: "City General Hospital",
            distance: "0.8 miles",
            address: "123 Health St, Medical District",
            emergency: true,
            specialties: ["Emergency Care", "Internal Medicine", "Allergy"]
        },
        {
            name: "Community Medical Center",
            distance: "1.2 miles",
            address: "456 Wellness Ave, Downtown",
            emergency: false,
            specialties: ["Family Medicine", "Urgent Care", "Pediatrics"]
        },
        {
            name: "Regional Health Clinic",
            distance: "2.5 miles",
            address: "789 Care Blvd, West Side",
            emergency: false,
            specialties: ["Primary Care", "Preventive Medicine", "Chronic Care"]
        }
    ],
    emergency_indicators: {
        seek_immediate_care: false,
        reason: null
    }
};

// Mock data for health forecast
const mockHealthForecast = {
    short_term_outlook: "• Symptom improvement expected within 48-72 hours with proper rest\n• Energy levels should gradually return to normal\n• Mild symptoms may persist but should be manageable",
    medium_term_outlook: "• Full recovery expected within 2-3 weeks\n• Immune system will be stronger post-recovery\n• Consider preventive measures for future episodes",
    long_term_outlook: "• Overall health outlook positive with current symptoms\n• Lifestyle improvements can prevent similar issues\n• Regular health monitoring recommended",
    prevention_strategies: [
        "Regular hand washing and hygiene practices",
        "Balanced diet rich in vitamins and minerals",
        "Regular exercise to boost immune function",
        "Adequate sleep and stress management",
        "Seasonal allergy precautions if applicable"
    ],
    warning_signs: [
        "High fever (>103°F/39.4°C) that doesn't respond to medication",
        "Difficulty breathing or chest pain",
        "Severe headache or neck stiffness",
        "Symptoms worsening after initial improvement",
        "Confusion or disorientation"
    ],
    lifestyle_recommendations: [
        "Maintain consistent sleep schedule (7-9 hours nightly)",
        "Incorporate immune-boosting foods into diet",
        "Regular moderate exercise (30 minutes, 5 days/week)",
        "Practice stress reduction techniques daily",
        "Stay well hydrated throughout the day"
    ]
};

async function analyzeSymptoms(data) {
    // If no AI available, return mock data immediately
    if (!genAI) {
        return mockSymptomAnalysis;
    }

    // Try to use AI if available
    try {
        const MODELS_TO_TRY = ["gemini-2.0-flash", "gemini-flash-latest", "gemini-2.0-flash-lite-preview-02-05"];
        
        const prompt = `Analyze these health symptoms for a ${data.age}-year-old ${data.gender} in ${data.location}.
Symptoms: ${data.symptoms}
Duration: ${data.duration || 'Not specified'}
Medical History: ${data.medicalHistory || 'None provided'}
Lifestyle: ${data.lifestyle || 'Not specified'}

IMPORTANT: This is for informational purposes only and not a substitute for professional medical advice.

Return JSON only (no markdown) with this structure:
{
  "symptom_analysis": {
    "possible_conditions": [{"name": "condition", "probability": 0-100, "description": "brief explanation"}],
    "key_symptoms": ["symptom1", "symptom2", "symptom3", "symptom4"]
  },
  "risk_assessment": {
    "overall_risk_score": 0-100,
    "risk_factors": ["factor1", "factor2", "factor3"]
  },
  "health_trends": {
    "short_term": "expected progression in 1-2 weeks",
    "medium_term": "expected progression in 1-3 months", 
    "long_term": "expected progression in 3+ months"
  },
  "recommendations": {
    "immediate": ["action1", "action2", "action3"],
    "lifestyle": ["change1", "change2", "change3"],
    "follow_up": ["followup1", "followup2", "followup3"]
  },
  "nearby_hospitals": [
    {"name": "hospital", "distance": "X miles", "address": "address", "emergency": true/false, "specialties": ["spec1", "spec2"]}
  ],
  "emergency_indicators": {
    "seek_immediate_care": true/false,
    "reason": "reason if immediate care needed"
  }
}`;

        for (const model of MODELS_TO_TRY) {
            try {
                const m = genAI.getGenerativeModel({ model });
                const result = await m.generateContent(prompt);
                const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(text);
            } catch (e) {
                console.warn(`Model ${model} failed`);
            }
        }
    } catch (e) {
        console.warn('AI symptom analysis failed:', e.message);
    }

    return mockSymptomAnalysis;
}

async function generateHealthForecast(healthData, previousAnalysis) {
    // If no AI available, return mock data immediately
    if (!genAI) {
        return mockHealthForecast;
    }

    // Try to use AI if available
    try {
        const MODELS_TO_TRY = ["gemini-2.0-flash", "gemini-flash-latest", "gemini-2.0-flash-lite-preview-02-05"];
        
        const prompt = `Generate a comprehensive health forecast for a ${healthData.age}-year-old ${healthData.gender} in ${healthData.location}.
Previous risk score: ${previousAnalysis.risk_assessment?.overall_risk_score || 0}/100.
Primary symptoms: ${healthData.symptoms}

IMPORTANT: This is for informational purposes only and not a substitute for professional medical advice.

Return JSON only (no markdown) with this structure:
{
  "short_term_outlook": "3 bullet points for next 1-2 weeks",
  "medium_term_outlook": "3 bullet points for 1-3 months", 
  "long_term_outlook": "3 bullet points for 3+ months",
  "prevention_strategies": ["strategy1", "strategy2", "strategy3", "strategy4", "strategy5"],
  "warning_signs": ["warning1", "warning2", "warning3", "warning4", "warning5"],
  "lifestyle_recommendations": ["recommendation1", "recommendation2", "recommendation3", "recommendation4", "recommendation5"]
}`;

        for (const model of MODELS_TO_TRY) {
            try {
                const m = genAI.getGenerativeModel({ model });
                const result = await m.generateContent(prompt);
                const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(text);
            } catch (e) {
                console.warn(`Model ${model} failed`);
            }
        }
    } catch (e) {
        console.warn('AI health forecast failed:', e.message);
    }

    return mockHealthForecast;
}

module.exports = { analyzeSymptoms, generateHealthForecast };
