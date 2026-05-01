// coder.js
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateTest(plan) {
  const res = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `
        Create a Playwright test suite in TypeScript based on this plan: ${JSON.stringify(plan)}
        
        STRICT RULES FOR STABLE & NON-FLAKY TESTS:
        1. Use Web-First Assertions: Always use "await expect(locator).to..." 
        2. Priority Locators: Use getByRole, getByLabel, getByText, or getByPlaceholder. 
        3. No Hardcoded Waits: Never use page.waitForTimeout(). 
        4. No CSS/XPath: Do not use .class or #id unless absolutely necessary.
        5. Independence: Each test must navigate to the URL independently.
        6. Clean Output: Return only pure TypeScript code, no markdown labels.
        `
      }
    ]
  });

  return res.content[0].text
    .replace(/```javascript/g, "")
    .replace(/```/g, "")
    .trim();
}

module.exports = { generateTest };