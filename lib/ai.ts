import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

// ⚠️ Do NOT crash build if missing
if (!apiKey) {
  console.warn("⚠️ GROQ_API_KEY is not defined");
}

const groq = apiKey
  ? new Groq({ apiKey })
  : null;

export async function runAI(
  content: string,
  type: "summary" | "improve" | "tags"
): Promise<string> {
  if (!groq) {
    throw new Error("AI service is not configured");
  }

  let prompt = content;

  if (type === "summary") {
    prompt = `
You are an assistant that summarizes notes.

If the input text is short, rewrite it as a concise summary.
If the input text is long, summarize it in 3-4 lines.

Start the summary on a new line.
Do not add extra explanations.

Text:
${content}
`;
  }

  if (type === "improve") {
    prompt = `
Improve grammar and clarity of the following text.
Return only the improved version.

Text:
${content}
`;
  }

  if (type === "tags") {
    prompt = `
Generate exactly 5 short tags.

Rules:
- Return ONLY a comma-separated list
- No sentences
- No explanations
- No numbering
- No hashtags

Content:
${content}
`;
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
  });

  const result = response.choices?.[0]?.message?.content;

  if (!result) {
    throw new Error("Empty response from Groq");
  }

  return result.trim();
}
