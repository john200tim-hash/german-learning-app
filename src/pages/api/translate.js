// src/pages/api/translate.js

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";
const apiKey = process.env.GEMINI_API_KEY;

const JSON_SCHEMA = {
    type: "OBJECT",
    properties: {
        "Explanation": { "type": "STRING", "description": "A clear, concise explanation of the topic or query in the target language." },
        "Translation": { "type": "STRING", "description": "A translation of the query's main subject or a related key term into the target language." },
        "Example": { "type": "STRING", "description": "A practical or conceptual example related to the query in the target language." },
        "Deep Research": { "type": "STRING", "description": "A slightly more in-depth or complex fact/detail about the query in the target language." }
    },
    required: ["Explanation", "Translation", "Example", "Deep Research"]
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!apiKey) {
        return res.status(500).json({ error: 'API key is not configured on the server. Please check your .env.local file and restart the server.' });
    }

    const { query, language } = req.body;

    if (!query || !language) {
        return res.status(400).json({ error: 'Query and language are required.' });
    }

    const systemPrompt = `You are an expert AI-Tool designed to analyze a user's query and provide a comprehensive, structured response for learning and research. You must strictly respond by calling the 'structured_response' function. The language of all content in the function arguments MUST be: ${language}. Ensure all four fields are filled with relevant, unique, and detailed content. The user's query is: "${query}"`;
    
    const payload = {
        contents: [{ parts: [{ text: `Generate a structured knowledge response for the topic: ${query}` }] }],
        // CORRECTED: Removed the conflicting 'generationConfig' that specified a response MIME type.
        // The model will now correctly use function calling.
        toolConfig: { functionCallingConfig: { mode: "ANY", allowedFunctionNames: ["structured_response"] } },
        systemInstruction: { parts: [{ text: systemPrompt }] },
        tools: [{ functionDeclarations: [{ name: "structured_response", description: "Returns a structured response based on the user's query.", parameters: JSON_SCHEMA }] }]
    };

    try {
        const googleResponse = await fetch(`${API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!googleResponse.ok) {
            const errorBody = await googleResponse.text();
            console.error("Google API Error:", errorBody);
            return res.status(googleResponse.status).json({ error: `API error: ${googleResponse.statusText}. Check server logs for details.` });
        }

        const data = await googleResponse.json();
        res.status(200).json(data);

    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: 'Failed to connect to the AI service.' });
    }
}
