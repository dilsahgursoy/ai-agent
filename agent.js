require("dotenv").config();

const fs = require("fs");
const { createPlan } = require("./planner");
const { generateTest } = require("./coder");
const { runTests } = require("./runner");
const { fixTest } = require("./fixer");

/**
 * AI tarafından üretilen metni temizler.
 * Markdown bloklarını ve dile özgü etiketleri kaldırır.
 */
function cleanCode(rawCode) {
  return rawCode
    .replace(/```(?:typescript|javascript|js|ts)?/gi, "") // Markdown bloklarını siler
    .replace(/^typescript\s+|^javascript\s+|^js\s+|^ts\s+/gi, "") // Baştaki dil etiketlerini siler
    .trim();
}

async function runAgent(task) {
  // Dosya yolunu .ts yaparak Playwright'ın TypeScript gücünden faydalanalım
  const testFilePath = "./generated/generated-test.spec.ts";

  console.log("🧠 Plan oluşturuluyor...");
  const plan = await createPlan(task);

  console.log("💻 Test yazılıyor...");
  let rawCode = await generateTest(plan);
  let code = cleanCode(rawCode);

  fs.writeFileSync(testFilePath, code);

  console.log("🚀 Testler koşturuluyor...");
  let result = runTests();

  let retry = 0;
  const maxRetries = 3; // Başarı şansını artırmak için retry sayısını 3 yaptık

  while (!result.success && retry < maxRetries) {
    console.log(`🔧 Hata bulundu (Deneme ${retry + 1}/${maxRetries}), düzeltiliyor...`);

    // Mevcut bozuk kodu ve hata mesajını fixer'a gönderiyoruz
    let fixedRawCode = await fixTest(code, result.error);
    code = cleanCode(fixedRawCode);

    fs.writeFileSync(testFilePath, code);

    // Tekrar koştur
    result = runTests();
    retry++;
  }

  if (result.success) {
    console.log("✅ Test başarıyla tamamlandı ve tüm hatalar giderildi!");
    const { exec } = require("child_process");
    exec("npx playwright show-report");
  } else {
    console.log("❌ Test hala fail ediyor. Son hata:");
    console.log(result.error);
  }
}

// Görevi biraz daha detaylandırarak başlatalım
runAgent("Login page test on [https://practicetestautomation.com/practice-test-login/](https://practicetestautomation.com/practice-test-login/)");