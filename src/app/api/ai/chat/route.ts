import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [], userProfile } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required and cannot be empty.' },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    const userName = userProfile?.name || 'Student';
    const careerGoal = userProfile?.careerGoal || 'Software Engineer';
    const skillLevel = userProfile?.skillLevel || 'Intermediate';

    const systemPrompt = `You are StudentOS AI Mentor, an expert SDE Coding Mentor and Computer Science Educator pairing with ${userName} (Career Goal: ${careerGoal}, Skill Level: ${skillLevel}).

YOUR ROLE & PERSONALITY:
- Friendly, encouraging, clear, highly structured, and professional.
- Explain concepts step-by-step so students build deep intuition for DSA, Web Development, System Design, Core CS (OS, DBMS, Networks), and placement prep.

GUIDELINES FOR TECHNICAL & DSA QUESTIONS:
1. High-Level Intuition: Explain the concept simply in plain language.
2. Step-by-Step Logic / Dry Run: Walk through algorithmic steps clearly.
3. Code Implementation: Provide complete, clean code in markdown code blocks with language identifiers (e.g. \`\`\`cpp, \`\`\`python, \`\`\`java, \`\`\`javascript).
4. Code Breakdown: Briefly explain key logic in the code.
5. Complexity Analysis: Explicitly state Time Complexity and Space Complexity using Big-O notation.

FORMATTING REQUIREMENTS:
- Use markdown formatting with bold headings, bullet points, and code blocks.
- Keep responses engaging, accurate, and easy to read on mobile and desktop screens.`;

    // 1. Try Google Gemini API (100% FREE Tier)
    if (geminiKey && geminiKey.trim() !== '' && geminiKey !== 'your_gemini_api_key_here' && !geminiKey.includes('YOUR_ACTUAL')) {
      try {
        const geminiHistory = (Array.isArray(history) ? history : [])
          .slice(-8)
          .map((msg: any) => ({
            role: msg.role === 'user' || msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text || msg.content || '' }],
          }))
          .filter((msg: any) => msg.parts[0].text.trim() !== '');

        const geminiContents = [
          ...geminiHistory,
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser Question: ${message.trim()}` }],
          },
        ];

        // Use gemini-3.6-flash (current supported Google AI Studio v1beta model)
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: geminiContents }),
          }
        );

        const geminiData = await geminiRes.json();

        if (geminiRes.ok && geminiData.candidates?.[0]?.content?.parts) {
          const textPart = geminiData.candidates[0].content.parts.find((p: any) => p.text)?.text || geminiData.candidates[0].content.parts[0].text;
          if (textPart) {
            return NextResponse.json({
              reply: textPart,
              provider: 'Google Gemini (100% Free)',
            });
          }
        } else if (geminiData.error) {
          console.error('Gemini Error:', geminiData.error);
          return NextResponse.json({
            error: `Gemini API Notice: ${geminiData.error.message || 'Invalid Gemini key'}`,
          }, { status: 200 });
        }
      } catch (err: any) {
        console.error('Gemini API Fetch Exception:', err);
      }
    }

    // 2. Try Groq API (100% FREE Tier)
    if (groqKey && groqKey.trim() !== '' && groqKey !== 'your_groq_api_key_here' && !groqKey.includes('YOUR_ACTUAL')) {
      try {
        const formattedHistory = (Array.isArray(history) ? history : [])
          .slice(-10)
          .map((msg: any) => ({
            role: msg.role === 'user' || msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text || msg.content || '',
          }))
          .filter((msg: any) => msg.content.trim() !== '');

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqKey.trim()}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              ...formattedHistory,
              { role: 'user', content: message.trim() },
            ],
            temperature: 0.7,
            max_tokens: 1500,
          }),
        });

        const groqData = await groqRes.json();
        if (groqRes.ok && groqData.choices?.[0]?.message?.content) {
          return NextResponse.json({
            reply: groqData.choices[0].message.content,
            provider: 'Groq AI (100% Free)',
          });
        }
      } catch (err) {
        console.error('Groq API Exception:', err);
      }
    }

    // 3. Try OpenAI API
    if (openAiKey && openAiKey.trim() !== '' && openAiKey !== 'your_openai_api_key_here' && !openAiKey.includes('YOUR_ACTUAL')) {
      const formattedHistory = (Array.isArray(history) ? history : [])
        .slice(-10)
        .map((msg: any) => ({
          role: msg.role === 'user' || msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text || msg.content || '',
        }))
        .filter((msg: any) => msg.content.trim() !== '');

      const apiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';

      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey.trim()}`,
        },
        body: JSON.stringify({
          model: apiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            ...formattedHistory,
            { role: 'user', content: message.trim() },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      const data = await openAiRes.json();

      if (!openAiRes.ok) {
        const apiErr = data?.error?.message || 'OpenAI API returned an error.';
        if (data?.error?.code === 'insufficient_quota') {
          return NextResponse.json({
            error: 'OpenAI quota limit reached. Please add GEMINI_API_KEY (100% FREE from https://aistudio.google.com/app/apikey) to your .env.local file.',
            isQuotaExceeded: true,
          }, { status: 200 });
        }
        return NextResponse.json({ error: apiErr }, { status: 200 });
      }

      const replyText = data.choices?.[0]?.message?.content;
      if (replyText) {
        return NextResponse.json({
          reply: replyText,
          model: data.model || apiModel,
        });
      }
    }

    // Default error if no active key is provided
    return NextResponse.json({
      error: 'No active AI API key configured. Please add GEMINI_API_KEY (100% FREE from https://aistudio.google.com/app/apikey) to your .env.local file.',
      isKeyMissing: true,
    }, { status: 200 });
  } catch (error: any) {
    console.error('AI Chat Backend Route Exception:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred on the server.' },
      { status: 500 }
    );
  }
}
