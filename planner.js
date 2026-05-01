// planner.js
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function createPlan(task) {
  const res = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `
Create a Playwright test plan.

Task: ${task}

Return ONLY JSON:
{
  "steps": [],
  "testCases": []
}
`
      }
    ]
  });

  // Gelen metni alıyoruz
  let rawContent = res.content[0].text;

  // Markdown kod bloklarını temizlemek için regex kullanıyoruz
  // Eğer metin ```json ile başlıyorsa içindeki kısmı alır, yoksa metni olduğu gibi bırakır.
  const jsonMatch = rawContent.match(/```json?\s*([\s\S]*?)\s*```/);
  const cleanJson = jsonMatch ? jsonMatch[1] : rawContent;

  try {
    return JSON.parse(cleanJson.trim());
  } catch (error) {
    console.error("JSON ayrıştırma hatası:", error);
    console.log("Gelen ham veri:", rawContent);
    throw new Error("Model geçerli bir JSON döndürmedi.");
  }
}

module.exports = { createPlan };