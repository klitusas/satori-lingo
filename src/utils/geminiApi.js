export const callGeminiAPI = async (endpoint, payload, apiKey, retries = 5, delay = 1000) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${endpoint}?key=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Google API returned status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (retries > 0) {
            await new Promise(res => setTimeout(res, delay));
            return callGeminiAPI(endpoint, payload, apiKey, retries - 1, delay * 2);
        }
        throw error;
    }
};

export const generateAISenseiExplanation = async (card, apiKey) => {
    const promptText = `Act as an expert bilingual Spanish language coach. Break down the phrase: "${card.spanish}" (meaning: "${card.english}").
  Provide:
  1. A literal translation breakdown.
  2. Important grammatical nuances or verbs used.
  3. Real-world context, situational cues, or regional slang details.
  Make it brief, educational, beautifully formatted in clean, professional markdown, and encouraging. Do NOT mention speech or audio details.`;

    const payload = { contents: [{ parts: [{ text: promptText }] }] };
    const data = await callGeminiAPI('gemini-2.5-flash-preview-09-2025:generateContent', payload, apiKey);
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
        throw new Error('Empty response received from API');
    }
    return responseText;
};

export const generateMnemonic = async (card, apiKey) => {
    const promptText = `A minimalist, clean Japandi style design, stamp, or conceptual line sketch representing the language concept: "${card.spanish}" which means "${card.english}". Subtle beige or neutral earth-tone backdrop, premium hand-drawn fine line art style, aesthetic balance, absolute clarity, no letters or words.`;
    const payload = { instances: [{ prompt: promptText }], parameters: { sampleCount: 1 } };

    const data = await callGeminiAPI('imagen-4.0-generate-001:predict', payload, apiKey);
    const base64Bytes = data.predictions?.[0]?.bytesBase64Encoded;
    if (!base64Bytes) {
        throw new Error('No image data returned in payload');
    }
    return `data:image/png;base64,${base64Bytes}`;
};

export const generateTopicDeck = async (customTopic, apiKey) => {
    const systemPrompt = 'You are a specialized Spanish vocabulary generator that outputs pure, valid JSON arrays for import into a language-learning spaced repetition tool.';
    const userPrompt = `Generate a highly structured collection of exactly 8 highly-authentic, practical, natural Spanish-English phrases for the scenario: "${customTopic}".
  Clean up any checklist brackets. If there are regional specifics, put them inside bracketed context notes.
  Do not add codeblock styling outside of pure JSON. Use this exact JSON structure:
  {
    "cards": [
      {
        "spanish": "Spanish target phrase",
        "english": "Natural English meaning",
        "context": "Brief context details [e.g. used in Spain / informal]"
      }
    ]
  }`;

    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'OBJECT',
                properties: {
                    cards: {
                        type: 'ARRAY',
                        items: {
                            type: 'OBJECT',
                            properties: {
                                spanish: { type: 'STRING' },
                                english: { type: 'STRING' },
                                context: { type: 'STRING', nullable: true }
                            },
                            required: ['spanish', 'english']
                        }
                    }
                },
                required: ['cards']
            }
        }
    };

    const data = await callGeminiAPI('gemini-2.5-flash-preview-09-2025:generateContent', payload, apiKey);
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(rawText);

    if (!parsed || !Array.isArray(parsed.cards)) {
        throw new Error('Invalid output layout from JSON compiler');
    }

    return parsed.cards;
};
