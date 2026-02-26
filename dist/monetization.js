(function() {
  function injectMonetization() {
    var container = document.getElementById('monetization-insert');
    if (!container) return;
    container.innerHTML = 
      '<!-- AdSense -->' +
      '<div class="my-8 text-center"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9409905856635578" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins></div>' +
      '<!-- Affiliate: Muhasebe / Barkod / Eğitim -->' +
      '<div class="my-8 p-6 bg-gray-50 rounded-xl"><h3 class="font-bold text-gray-900 mb-3">Satıcılar İçin Önerilen Hizmetler</h3>' +
      '<ul class="space-y-2 text-sm text-gray-600"><li>• <a href="#" class="text-primary hover:underline">Muhasebe programları</a> — E-fatura, fatura kesme</li>' +
      '<li>• <a href="#" class="text-primary hover:underline">Barkod firmaları</a> — GTIN barkod alma</li>' +
      '<li>• <a href="#" class="text-primary hover:underline">E-ticaret eğitim platformları</a> — Satıcı eğitimleri</li></ul></div>' +
      '<!-- Lead Form: Danışmanlık -->' +
      '<div id="danismanlik" class="my-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">' +
      '<h3 class="font-bold text-gray-900 mb-2">Trendyol Mağaza Açma Danışmanlığı</h3>' +
      '<p class="text-gray-600 text-sm mb-4">Profesyonel destek alarak mağaza açma sürecinizi hızlandırın.</p>' +
      '<form class="space-y-3 max-w-md"><input type="text" placeholder="Ad Soyad" class="w-full px-4 py-2 rounded-lg border border-gray-300">' +
      '<input type="email" placeholder="E-posta" class="w-full px-4 py-2 rounded-lg border border-gray-300">' +
      '<input type="tel" placeholder="Telefon" class="w-full px-4 py-2 rounded-lg border border-gray-300">' +
      '<button type="submit" class="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90">Danışmanlık Talep Et</button></form></div>';
    if (window.adsbygoogle) { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectMonetization);
  else injectMonetization();
})();
