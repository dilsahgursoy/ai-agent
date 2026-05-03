Bu projenin temel amacı, Playwright’ın web otomasyon yetenekleri ile yapay zeka (AI) modellerini birleştirerek, web üzerinde karmaşık görevleri otonom bir şekilde yerine getirebilen akıllı bir "AI Agent" (Yapay Zeka Ajanı) geliştirmektir.

Projenin teknik ve fonksiyonel kapsamını şu üç ana başlıkta özetleyebiliriz:

1. Akıllı Web Otomasyonu ve Test
Proje, sıradan bir otomasyon aracından farklı olarak, web sayfalarındaki elementleri tanıma ve etkileşime geçme süreçlerini yapay zeka desteğiyle yönetir. Özellikle bir Software Test Engineer bakış açısıyla kurgulandığı için, hata yakalama (bug detection) ve kullanıcı senaryolarını simüle etme konusunda yüksek doğruluk hedefler.

2. Teknik Altyapı ve Güvenilirlik
Çoklu Tarayıcı Desteği: Playwright Core sayesinde Chromium, Firefox ve WebKit gibi farklı motorlar üzerinde sorunsuz çalışabilir.

Tip Güvenliği (Type Safety): json-schema-to-ts kullanımıyla, gelen veriler veya şemalar otomatik olarak TypeScript arayüzlerine dönüştürülür. Bu da kodun çalışma anında hata verme riskini minimize eder.

Dinamik Veri İşleme: Proje, Anthropic gibi LLM (Büyük Dil Modeli) API'lerini kullanarak sayfadaki metinleri anlamlandırabilir ve bir sonraki adımın ne olması gerektiğine karar verebilir.

3. Profesyonel Standartlar ve Hedefler
Bu çalışma sadece teknik bir kod yığını değil, aynı zamanda ISTQB standartlarına ve modern yazılım test metodolojilerine (Test Çeyrekleri vb.) uygun bir altyapı sunmayı amaçlar. Geliştirilen bu ajan, karmaşık UI bileşenlerini test etmek ve tekrar eden manuel işleri otomatize etmek için tasarlanmıştır.

Kısacası proje; bir web tarayıcısını "gören", "anlayan" ve "karar veren" bir yazılım asistanı inşa etme sürecidir
