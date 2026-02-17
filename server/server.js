
// Global Error Handling for Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

require('dotenv').config();
console.log('🚀 Starting server...');
console.log('Environment variables loaded');
console.log('GEMINI_API_KEY present:', !!process.env.GEMINI_API_KEY);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { analyzeSymptoms } = require('./services/healthAiService');
console.log('✅ All modules loaded successfully');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (non-blocking, graceful fallback)
mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.warn('⚠️ MongoDB Connection Error (continuing without DB):', err.message);
        console.warn('💡 Tip: Database save will be skipped. Ensure MongoDB is running on localhost:27017 for full functionality.');
    });

// Routes
app.post('/api/analyze-symptoms', async (req, res) => {
    try {
        console.log('📨 Received /api/analyze-symptoms request');
        const { patientName, age, gender, location, symptoms, duration, medicalHistory, lifestyle } = req.body;
        console.log('Fields received:', { 
            patientName, 
            age, 
            gender, 
            location, 
            symptomsLength: symptoms?.length,
            duration,
            hasMedicalHistory: !!medicalHistory,
            lifestyle
        });

        // --- Validation Logic ---
        if (!patientName || !age || !gender || !location || !symptoms) {
            return res.status(400).json({ 
                error: 'Required fields missing (Name, Age, Gender, Location, Symptoms).' 
            });
        }

        if (symptoms.length < 30) {
            return res.status(400).json({ 
                error: 'Symptoms description is too short. Please provide at least 30 characters for accurate analysis.' 
            });
        }

        // --- AI Analysis ---
        console.log('🤖 Calling analyzeSymptoms...');
        const analysis = await analyzeSymptoms({ 
            patientName, 
            age, 
            gender, 
            location, 
            symptoms, 
            duration, 
            medicalHistory, 
            lifestyle 
        });
        console.log('✅ Analysis complete');

        // --- Save to Database (optional, don't block response) ---
        try {
            const HealthAnalysis = require('./models/HealthAnalysis');
            const newAnalysis = new HealthAnalysis({
                patientName,
                age,
                gender,
                location,
                symptoms,
                duration,
                medicalHistory,
                lifestyle,
                analysisResult: analysis
            });
            await newAnalysis.save();
            console.log('✅ Data saved to database');
        } catch (dbError) {
            // Don't block the response - just log the error
            console.warn("⚠️ Database Save Error (non-critical):", dbError.message);
        }

        console.log('📤 Sending analysis response');
        res.json(analysis);
    } catch (error) {
        console.error('SERVER ERROR during analysis:', error);
        res.status(500).json({
            error: 'Internal Server Error. Check server logs for details.',
            details: error.message
        });
    }
});

app.post('/api/health-forecast', async (req, res) => {
    try {
        const { healthData, analysisResult } = req.body;

        if (!healthData || !analysisResult) {
            return res.status(400).json({ error: 'Missing health data or previous analysis.' });
        }

        const { generateHealthForecast } = require('./services/healthAiService');
        const forecast = await generateHealthForecast(healthData, analysisResult);

        res.json(forecast);
    } catch (error) {
        console.error('HEALTH FORECAST ERROR:', error);
        res.status(500).json({ error: 'Failed to generate health forecast.' });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
