(function() {
  function injectMonetization() {
    var container = document.getElementById('monetization-insert');
    if (!container) return;
    container.innerHTML = 
      '<!-- AdSense -->' +
      '<div class="my-8 text-center"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9409905856635578" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins></div>' +
      '<!-- Content-first helper links -->' +
      '<div class="my-8 p-5 bg-gray-50 rounded-xl border border-gray-200">' +
      '<h3 class="font-bold text-gray-900 mb-2">Icerik Onerileri</h3>' +
      '<p class="text-gray-600 text-sm mb-3">Asagidaki rehberler satıs stratejinizi gelistirmek icin hazirlandi:</p>' +
      '<ul class="space-y-2 text-sm text-gray-700">' +
      '<li>• <a href="trendyol-satici-basvurusu.html" class="text-primary hover:underline">Satici basvurusu adimlari</a></li>' +
      '<li>• <a href="trendyol-komisyon-hesaplama.html" class="text-primary hover:underline">Komisyon hesaplama rehberi</a></li>' +
      '<li>• <a href="kargo-desi-hesaplama.html" class="text-primary hover:underline">Kargo desi hesaplama</a></li>' +
      '</ul></div>';
    if (window.adsbygoogle) { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectMonetization);
  else injectMonetization();
})();
