const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function fixTest(code, error) {
  const res = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `
        The Playwright test failed. Your goal is to fix the code based on the error log and best practices.

        CONTEXT:
        - Target Site: https://practicetestautomation.com/practice-test-login/
        - Environment: Node.js with TypeScript (Use TypeScript types like ": Page")

        ORIGINAL CODE:
        ${code}

        ERROR LOG:
        ${error}

        STRICT FIXING RULES TO PREVENT FLAKINESS:
        1. WEB-FIRST ASSERTIONS: Always use "await expect(locator).to..." instead of boolean checks.
        2. LOCATOR STRATEGY: Prefer getByRole, getByText, or getByLabel over CSS/XPath to avoid strict mode violations.
        3. ERROR MESSAGE MATCHING: If the log shows a mismatch (Expected vs Received), update the test with the EXACT "Received" string.
        4. TIMEOUTS: If an element is not found, do NOT add page.waitForTimeout(). Instead, ensure the locator is correct and use the built-in auto-waiting of expect().
        5. CLEAN OUTPUT: Return ONLY the raw TypeScript code. Remove any markdown blocks (\`\`\`typescript) or labels.

        Return ONLY the fixed code.
        `
      }
    ]
  });

  // Regex ile kod bloklarını ve dile özgü etiketleri temizleyelim
  return res.content[0].text
    .replace(/```(?:typescript|javascript|js|ts)?/gi, "")
    .replace(/^typescript\s+|^javascript\s+|^js\s+|^ts\s+/gi, "")
    .trim();
}

module.exports = { fixTest };