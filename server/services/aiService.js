const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize with check for placeholder key
let genAI = null;
try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.trim().length > 0) {
        genAI = new GoogleGenerativeAI(apiKey);
        console.log('✅ Google Generative AI initialized');
    } else {
        console.log('⚠️ Using MOCK data mode - no valid API key');
    }
} catch (err) {
    console.log('⚠️ Could not initialize AI - using MOCK mode');
}

// Mock data for analysis
const mockAnalysis = {
    product_demand: {
        score: 88,
        summary: [
            "High potential identified due to unsaturated local market.",
            "Growing interest in sustainable tech solutions in this region.",
            "Early adopters are actively seeking this type of innovation."
        ]
    },
    demand_trend: [
        { month: "Jan", demand: 65 }, { month: "Feb", demand: 68 }, { month: "Mar", demand: 75 },
        { month: "Apr", demand: 80 }, { month: "May", demand: 85 }, { month: "Jun", demand: 82 },
        { month: "Jul", demand: 88 }, { month: "Aug", demand: 90 }, { month: "Sep", demand: 87 },
        { month: "Oct", demand: 92 }, { month: "Nov", demand: 95 }, { month: "Dec", demand: 98 }
    ],
    customer_preferences: [
        "Preference for eco-friendly packaging",
        "High sensitivity to price-performance ratio",
        "Strong loyalty to local brands"
    ],
    seasonal_trends: "Peak demand observed during late Q3 and Q4 due to regional festivals. Q1 is generally slower for this sector.",
    marketing_advice: "Focus on community-driven events and hyper-local social media campaigns. Influencer marketing works well here."
};

// Mock data for forecast
const mockForecast = {
    year_one: "• Launch MVP and secure first 500 active users.\n• Establish partnerships with 3 key local distributors.\n• Focus heavily on brand awareness and community building.",
    year_three: "• Expand into 2 neighboring regions/cities.\n• Achieve break-even profitability and series A funding.\n• Release version 2.0 with premium enterprise features.",
    year_five: "• Become the market leader in the specific region.\n• Potential acquisition target for major tech conglomerates.\n• Diversify product line into related verticals.",
    risks: [
        "Regulatory changes in the local market",
        "Saturation by well-funded international competitors",
        "Supply chain disruptions affecting delivery times"
    ],
    opportunities: [
        "Franchising the model to other developing territories",
        "B2B integration services",
        "Government grants for sustainable innovation"
    ]
};

async function analyzeStartup(data) {
    // If no AI available, return mock data immediately
    if (!genAI) {
        return mockAnalysis;
    }

    // Try to use AI if available
    try {
        const MODELS_TO_TRY = ["gemini-2.0-flash", "gemini-flash-latest", "gemini-2.0-flash-lite-preview-02-05"];
        
        const prompt = `Analyze this startup: ${data.startupName} in ${data.region}.
Industry: ${data.industry}, Category: ${data.category}.
Description: ${data.description}

Return JSON only (no markdown) with keys: product_demand {score: 0-100, summary: [3 points]}, demand_trend [{month, demand}...12 months], customer_preferences [3 strings], seasonal_trends: "string", marketing_advice: "string"`;

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
        console.warn('AI analysis failed:', e.message);
    }

    return mockAnalysis;
}

async function generateForecast(data, previousAnalysis) {
    // If no AI available, return mock data immediately
    if (!genAI) {
        return mockForecast;
    }

    // Try to use AI if available
    try {
        const MODELS_TO_TRY = ["gemini-2.0-flash", "gemini-flash-latest", "gemini-2.0-flash-lite-preview-02-05"];
        
        const prompt = `Create 5-year forecast for: ${data.startupName} in ${data.region}.
Previous demand score: ${previousAnalysis.product_demand.score}/100.

Return JSON only (no markdown) with keys: year_one: "3 points", year_three: "3 points", year_five: "3 points", risks: [3 items], opportunities: [3 items]`;

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
        console.warn('AI forecast failed:', e.message);
    }

    return mockForecast;
}

module.exports = { analyzeStartup, generateForecast };
