// coder.js
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * @param {Object} plan - Test adımlarını içeren plan
 * @param {string} pageObjects - pages/ klasöründeki dosyaların içeriği
 */
async function generateTest(plan, pageObjects) {
  const res = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `
        Create a Playwright test suite in TypeScript based on this plan: ${JSON.stringify(plan)}
        
        CONTEXT - AVAILABLE PAGE OBJECTS:
        Use the following Page Object classes found in the project. Import them from '../pages/filename':
        ${pageObjects}

        STRICT RULES FOR POM-BASED TESTS:
        1. **POM Priority**: Always use the provided Page Object classes and their methods.
        2. **Imports**: Ensure you import the Page Object classes correctly (e.g., import { LoginPage } from '../pages/LoginPage').
        3. **Web-First Assertions**: Always use "await expect(locator).to..." for final checks.
        4. **Priority Locators**: If you must create a new locator, use getByRole, getByLabel, or getByPlaceholder.
        5. **No Hardcoded Waits**: Never use page.waitForTimeout().
        6. **Clean Output**: Return ONLY pure TypeScript code. No explanations, no markdown blocks.
        `
      }
    ]
  });

  // Gelen yanıtı temizleyip döndürüyoruz
  return res.content[0].text
    .replace(/```(?:typescript|javascript|js|ts)?/gi, "")
    .replace(/```/g, "")
    .trim();
}

module.exports = { generateTest };