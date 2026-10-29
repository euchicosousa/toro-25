/*
 * Rastreamento do link app: Google Analytics (Google tag) e Pixel da Meta.
 *
 * Preencha os IDs abaixo para ativar. Vazio ("") = desativado, nada é carregado.
 * Toda página que inclui este arquivo passa a registrar a visita (PageView).
 */
const RASTREAMENTO = {
  googleTagId: "", // Google Analytics 4: "G-XXXXXXXXXX"
  metaPixelId: "", // Pixel da Meta (Facebook/Instagram): "123456789012345"
};

(() => {
  const carregando = [];

  const carregar = (src) =>
    carregando.push(
      new Promise((pronto) => {
        const s = document.createElement("script");
        s.async = true;
        s.src = src;
        s.onload = s.onerror = pronto;
        document.head.appendChild(s);
      }),
    );

  if (RASTREAMENTO.googleTagId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      dataLayer.push(arguments);
    };
    gtag("js", new Date());
    gtag("config", RASTREAMENTO.googleTagId);
    carregar("https://www.googletagmanager.com/gtag/js?id=" + RASTREAMENTO.googleTagId);
  }

  if (RASTREAMENTO.metaPixelId) {
    // Fila oficial do fbq: guarda as chamadas até o script da Meta carregar.
    const fbq = (window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    });
    window._fbq = window._fbq || fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    fbq("init", RASTREAMENTO.metaPixelId);
    fbq("track", "PageView");
    carregar("https://connect.facebook.net/en_US/fbevents.js");
  }

  // Registra um evento nas ferramentas ativas.
  window.rastrear = (nome, dados) => {
    if (window.gtag) gtag("event", nome, dados);
    if (window.fbq) fbq("trackCustom", nome, dados);
  };

  // Cliques em qualquer elemento com data-track="nome" viram o evento clique_link.
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-track]");
    if (el) rastrear("clique_link", { destino: el.dataset.track });
  });

  // Usado pelas páginas de rota: espera os scripts carregarem (o PageView sair) e redireciona.
  // replace() evita que o "voltar" do navegador caia de novo no redirecionamento.
  window.redirecionar = (url) => {
    let saiu = false;
    const sair = () => {
      if (saiu) return;
      saiu = true;
      location.replace(url);
    };
    if (!carregando.length) return sair();
    Promise.all(carregando).then(() => setTimeout(sair, 300));
    setTimeout(sair, 2500); // limite caso algum script trave
  };
})();
