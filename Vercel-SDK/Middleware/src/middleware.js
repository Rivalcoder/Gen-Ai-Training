import { NextResponse } from 'next/server';

export async function middleware(req) {
  const body = await req.json();
  const prompt =body.prompt;
    console.log(prompt)
  // If prompt is missing, respond with 404 and do not proceed further
  if (!prompt) {
    return NextResponse.json(
      { error: 'Prompt is required.' },
      { status: 404 }
    );
  }

  // If prompt exists, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: '/api/generate',  // This middleware only runs for the /api/generate route
};
