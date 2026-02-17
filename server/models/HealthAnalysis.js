const mongoose = require('mongoose');

const HealthAnalysisSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    location: { type: String, required: true },
    symptoms: { type: String, required: true },
    duration: { type: String },
    medicalHistory: { type: String },
    lifestyle: { type: String },
    analysisResult: { type: Object }, // Store the AI analysis
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HealthAnalysis', HealthAnalysisSchema);
