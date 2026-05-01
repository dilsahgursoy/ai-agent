const { execSync } = require("child_process");

function runTests() {
  try {
    const output = execSync("npx playwright test", {
      encoding: "utf-8"
    });

    return { success: true, output };
  } catch (err) {
    return { success: false, error: err.stdout?.toString() || err.message };
  }
}

module.exports = { runTests };