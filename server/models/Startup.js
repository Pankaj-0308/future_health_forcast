const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
    startupName: { type: String, required: true },
    industry: { type: String, required: true },
    category: { type: String, required: true },
    region: { type: String, required: true },
    description: { type: String },
    analysisResult: { type: Object }, // Store the AI analysis
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Startup', StartupSchema);
