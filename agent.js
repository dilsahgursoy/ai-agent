require("dotenv").config();

const fs = require("fs");
const { createPlan } = require("./planner");
const { generateTest } = require("./coder");
const { runTests } = require("./runner");
const { fixTest } = require("./fixer");

function cleanCode(rawCode) {
  return rawCode
    .replace(/```(?:typescript|javascript|js|ts)?/gi, "") 
    .replace(/^typescript\s+|^javascript\s+|^js\s+|^ts\s+/gi, "") 
    .trim();
}

async function runAgent(task) {
  const testFilePath = "./generated/generated-test.spec.ts";

  // ADIM 1: POM Context Hazırlama
  const pageObjects = fs.readdirSync("./pages")
    .filter(file => file.endsWith(".ts") || file.endsWith(".js"))
    .map(file => {
      return `File: ${file}\nContent: ${fs.readFileSync(`./pages/${file}`, "utf8")}`;
    }).join("\n\n");

  console.log("🧠 Plan oluşturuluyor...");
  const plan = await createPlan(task);

  console.log("💻 Test yazılıyor (POM yapısı kullanılarak)...");
  let rawCode = await generateTest(plan, pageObjects); 
  let code = cleanCode(rawCode);

  fs.writeFileSync(testFilePath, code);

  // ADIM 3: Testleri Koşturma (AWAIT ekledik!)
  console.log("🚀 Testler koşturuluyor...");
  let result = await runTests(); // runTests asenkron ise await şart!

  let retry = 0;
  const maxRetries = 3;

  while (!result.success && retry < maxRetries) {
    console.log(`🔧 Hata bulundu (Deneme ${retry + 1}/${maxRetries}), düzeltiliyor...`);

    // Fixer'a hem hatalı kodu hem de POM yapısını gönderiyoruz
    let fixedRawCode = await fixTest(code, result.error, pageObjects);
    code = cleanCode(fixedRawCode);

    fs.writeFileSync(testFilePath, code);

    console.log("🔄 Tekrar deneniyor...");
    result = await runTests();
    retry++;
  }

  if (result.success) {
    console.log("✅ Test başarıyla tamamlandı!");
    // Raporu çakışma olmaması için farklı portta açıyoruz
    const { exec } = require("child_process");
    exec("npx playwright show-report --port 9325");
  } else {
    console.log("❌ Test hala fail ediyor. Son hata:");
    console.log(result.error);
  }
}

runAgent("Login page test on [https://practicetestautomation.com/practice-test-login/](https://practicetestautomation.com/practice-test-login/)");