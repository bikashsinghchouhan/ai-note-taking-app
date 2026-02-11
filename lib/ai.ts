import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
});

export async function runAI(
    content: string,
    type: "summary" | "improve" | "tags"
): Promise<string> {
    let prompt = content;

    if (type === "summary") {
        prompt = `
You are an assistant that summarizes notes.

If the input text is short, rewrite it as a concise summary.
If the input text is long, summarize it in 3–4 lines.

Text:
${content}
`;
    }


    if (type === "improve") {
        prompt = `Improve grammar and clarity:\n\n${content}`;
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
