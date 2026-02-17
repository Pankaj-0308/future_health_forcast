require('dotenv').config();
const https = require('https');

const apiKey = process.env.GEMINI_API_KEY;
// Note: Use v1beta or v1 depending on what works, but v1beta is standard for recent models
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            const fs = require('fs');
            // ... inside callback ...
            if (json.models) {
                const names = json.models.map(m => m.name).join('\n');
                fs.writeFileSync('available_models.txt', names);
                console.log("Wrote models to available_models.txt");
            } else {
                console.log("ERROR:", JSON.stringify(json));
            }
        } catch (e) {
            console.error("Parse Error:", e);
        }
    });
}).on('error', err => {
    console.error("Request Error:", err);
});
