export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    // Nembak API Google Gemini (Model 1.5 Flash - Cepet & Gratis)
     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'PO
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API Error');
    }

    // Ambil teks balasan dari Gemini
    const resultText = data.candidates[0].content.parts[0].text;
    
    res.status(200).json({ result: resultText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
        }
