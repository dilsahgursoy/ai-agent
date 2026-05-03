🤖 AI-Powered Self-Healing Test Agent
Bu proje, modern yazılım test süreçlerini yapay zeka ile otomatize eden, kendi hatalarını teşhis edip düzeltebilen (self-healing) ve Page Object Model (POM) mimarisini kullanan gelişmiş bir test ajanıdır.

🌟 Öne Çıkan Özellikler
Self-Healing (Kendi Kendini İyileştirme): Test koşumu sırasında bir hata (fail) oluştuğunda, ajan hatayı analiz eder, kodu otomatik olarak düzeltir ve testi yeniden koşturur.

POM-Driven Code Generation: Üretilen test kodları, projedeki mevcut pages/ klasöründeki Page Object sınıflarını baz alır. Bu, sürdürülebilir ve temiz kod üretimini garanti eder.

Multi-Agent Architecture: Süreç; Planner (planlama), Coder (kodlama), Runner (koşturma) ve Fixer (düzeltme) birimlerinden oluşan modüler bir yapıya sahiptir.

TypeScript & Playwright: Endüstri standardı olan hızlı, güvenilir ve modern test araçları üzerine inşa edilmiştir.

🏗️ Mimari Yapı
Proje, yazılım test mühendisliği prensiplerine sadık kalarak şu hiyerarşi ile kurgulanmıştır:

📂 pages/: Uygulama sayfalarının elementlerini ve metodlarını barındıran Page Object sınıfları.

📂 generated/: AI tarafından dinamik olarak üretilen TypeScript test dosyaları.

⚙️ agent.js: Tüm süreci (Plan -> Code -> Run -> Fix) yöneten ana orkestrasyon dosyası.

🔧 fixer.js: Hata mesajlarını ve mevcut DOM yapısını analiz ederek iyileştirme yapan birim.

🚀 Başlangıç
Gereksinimler
Node.js (v18+)

Anthropic API Anahtarı (Claude 3.5 Haiku)

Kurulum ve Çalıştırma
Depoyu klonlayın: git clone [https://github.com/dilsahgursoy/ai-agent.git](https://github.com/dilsahgursoy/ai-agent.git)

Bağımlılıkları yükleyin: npm install

.env dosyasını oluşturun ve API anahtarınızı ekleyin: ANTHROPIC_API_KEY=your_key_here

Ajanı başlatın:

Bash
node agent.js
📊 Örnek Akış (Workflow)
Ajan bir görev aldığında (örneğin: "Login sayfasını test et") şu döngüyü tamamlar:

Planner: Sayfadaki kritik kullanıcı senaryolarını (pozitif/negatif) belirler.

Coder: Projedeki pages/LoginPage.ts dosyasını referans alarak TypeScript kodunu yazar.

Runner: Testleri Playwright ile farklı tarayıcılarda koşturur.

Fixer: Eğer bir assertion hatası alınırsa, kodu otomatik revize ederek başarıya ulaşana kadar (max 3 deneme) süreci yönetir.