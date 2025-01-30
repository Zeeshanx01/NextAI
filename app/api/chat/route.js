import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message } = await req.json(); // Get user input

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-r1:1.5b', // Use your installed model
        prompt: message,
        stream: false, // Set to true for streaming responses
      }),
    });

    const data = await response.json();
    return NextResponse.json({ reply: data.response }); // Send AI reply to frontend
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
