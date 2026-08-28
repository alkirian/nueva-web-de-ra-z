/* ============================================================
   DE RAÍZ — Interfaz compartida (header, menú, footer, tarjetas)
   No hace falta tocar este archivo.
   ============================================================ */

window.DR = window.DR || {};

(function () {

  /* ─────────────────────────── ICONOS ─────────────────────────── */

  const I = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    bolsa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 8h13l-.9 11.2a1.8 1.8 0 0 1-1.8 1.6H8.2a1.8 1.8 0 0 1-1.8-1.6L5.5 8Z"/><path d="M8.8 10.5V6.7a3.2 3.2 0 0 1 6.4 0v3.8"/></svg>',
    mas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    menos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    tacho: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7M6.5 7l.8 12a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.8-12M10 11v6M14 11v6"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    volver: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.5a6.5 6.5 0 0 1 6.5 6.3C18.5 15.6 12 21 12 21Z"/><circle cx="12" cy="10.7" r="2.3"/></svg>',
    reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2.2"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Zm0 1.7a7.3 7.3 0 1 1-3.9 13.5l-.4-.2-2.6.7.7-2.5-.3-.4A7.3 7.3 0 0 1 12 4.7Zm-2.9 3.6c-.2 0-.4 0-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.2 1.6 2.6 4 3.5 2 .8 2.4.6 2.8.6.4 0 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6 6 0 0 1-1.8-1.1 6.6 6.6 0 0 1-1.2-1.5c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.7 8.6c-.2-.3-.3-.3-.6-.3Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".9" fill="currentColor" stroke="none"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 8.5h2.2V5.6h-2.4c-2 0-3.3 1.4-3.3 3.4v2.1H9v2.8h2v6.5h3v-6.5h2.3l.4-2.8H14v-1.7c0-.6.2-.9.5-.9Z"/></svg>',
    sol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/></svg>',
    gota: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z"/></svg>',
    planta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13h10l-1 7.2a1.4 1.4 0 0 1-1.4 1.3H9.4A1.4 1.4 0 0 1 8 20.2L7 13Z"/><path d="M12 13V9.5M12 9.5C12 6.5 9.8 4.4 7 4.4c0 3 2.2 5.1 5 5.1ZM12 9.5c0-3 2.2-5.1 5-5.1 0 3-2.2 5.1-5 5.1Z"/></svg>',
    vivero: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5"/><path d="M6 9v10.5h12V9"/><path d="M10 19.5v-5h4v5"/></svg>',
    envio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 7.5 12 3.8l8.5 3.7v9L12 20.2l-8.5-3.7v-9Z"/><path d="M3.5 7.5 12 11.2l8.5-3.7M12 11.2v9"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 6.8A2.3 2.3 0 0 1 6.8 4.5h10.4a2.3 2.3 0 0 1 2.3 2.3v7.4a2.3 2.3 0 0 1-2.3 2.3H9l-4.5 3.7V6.8Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    hojita: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5C11 5 5.5 10 5.5 19c9 0 13.5-5.5 13.5-14Z"/><path d="M5.5 19C9 13.5 13 9.5 19 5"/></svg>',
    bicho: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="13.5" r="5.5"/><path d="M12 8V5.5M9.5 8.6 7.8 6.4M14.5 8.6l1.7-2.2M6.5 13.5H4M20 13.5h-2.5M7.5 17.5l-2 1.8M16.5 17.5l2 1.8M12 10.5V19"/></svg>',
    sobre: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>',
  };
  DR.icono = (nombre) => I[nombre] || '';

  /* Ramita del logo */
  const SPRIG =
    '<svg class="sprig" viewBox="0 0 64 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M6 22 Q32 17 58 6"/>' +
    '<path d="M17 20.5 Q14.5 13.5 20 9.5 Q23 15.5 17 20.5Z"/>' +
    '<path d="M30 17.5 Q27.5 10.5 33 6.5 Q36 12.5 30 17.5Z"/>' +
    '<path d="M44 13 Q41.5 6 47 2 Q50 8 44 13Z"/>' +
    '<path d="M23 21.5 Q28 25.5 33.5 22.5 Q28.5 18.5 23 21.5Z"/>' +
    '<path d="M37 17.5 Q42 21.5 47.5 18.5 Q42.5 14.5 37 17.5Z"/>' +
    '</svg>';
  DR.sprig = () => SPRIG;

  /* ─────────────── ARTE PLACEHOLDER (mientras no hay fotos) ─────────────── */

  const ARTE = {
    hoja:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M32 56V22"/><path d="M32 22C32 12 40 6 50 6c0 12-8 18-18 16Z"/>' +
      '<path d="M32 34c0-8-7-13-15-13 0 10 7 15 15 13Z"/>' +
      '<path d="M32 46c0-7-6-11-13-11 0 9 6 13 13 11Z"/></svg>',
    flor:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M32 57V30"/><circle cx="32" cy="18" r="4.5"/>' +
      '<path d="M32 13.5c0-5 3.5-7.5 3.5-7.5S39 9 39 13"/><path d="M36.5 18c5 0 7.5 3.5 7.5 3.5S41 25 37 25"/>' +
      '<path d="M27.5 18c-5 0-7.5 3.5-7.5 3.5S23 25 27 25"/><path d="M32 22.5c0 5-3.5 7.5-3.5 7.5"/>' +
      '<path d="M32 40c-3-6-9-8-14-7 1 7 7 10 14 7Z"/><path d="M32 48c3-5 8-7 13-6-1 6-7 9-13 6Z"/></svg>',
    palma:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M32 57V26"/><path d="M32 26C32 16 24 9 14 9c2 11 9 17 18 17Z"/>' +
      '<path d="M32 26c0-10 8-17 18-17-2 11-9 17-18 17Z"/>' +
      '<path d="M32 36c-2-7-9-11-16-10 2 9 9 12 16 10Z"/>' +
      '<path d="M32 36c2-7 9-11 16-10-2 9-9 12-16 10Z"/></svg>',
    suculenta:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M32 44c-3-8-1-15 0-18 1 3 3 10 0 18Z"/>' +
      '<path d="M28 43c-6-5-8-11-8-15 4 1 9 5 10 12"/><path d="M36 43c6-5 8-11 8-15-4 1-9 5-10 12"/>' +
      '<path d="M22 44c-4-2-7-5-8-8 3 0 7 1 10 4"/><path d="M42 44c4-2 7-5 8-8-3 0-7 1-10 4"/>' +
      '<path d="M18 44h28l-2.5 11a3 3 0 0 1-3 2.4h-17a3 3 0 0 1-3-2.4L18 44Z"/></svg>',
    maceta:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M14 24h36v6H14z"/><path d="M18 30l3 22a3.4 3.4 0 0 0 3.4 3h15.2a3.4 3.4 0 0 0 3.4-3l3-22"/>' +
      '<path d="M32 24v-5"/><path d="M32 19c0-6-4.5-9.5-10-9.5 1 6 5 9.5 10 9.5Z"/>' +
      '<path d="M32 19c0-6 4.5-9.5 10-9.5-1 6-5 9.5-10 9.5Z"/></svg>',
    canasto:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 26h40l-3.5 24a4 4 0 0 1-4 3.4h-25a4 4 0 0 1-4-3.4L12 26Z"/>' +
      '<path d="M14.5 34.5h35M16 43h32"/><path d="M22 26v27M32 26v27.5M42 26v27"/>' +
      '<path d="M32 21c0-5-4-8-9-8 1 5 4.5 8 9 8ZM32 21c0-5 4-8 9-8-1 5-4.5 8-9 8Z"/></svg>',
    bolsa:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M18 20h28v34a3 3 0 0 1-3 3H21a3 3 0 0 1-3-3V20Z"/><path d="M18 27h28"/>' +
      '<path d="M24 20v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>' +
      '<path d="M32 48v-9"/><path d="M32 39c0-4.5-3.5-7-7.5-7 .8 4.5 3.7 7 7.5 7Z"/>' +
      '<path d="M32 42c0-3.5 3-5.5 6.5-5.5-.7 4-3.2 5.8-6.5 5.5Z"/></svg>',
    gotero:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M24 26h16v25a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V26Z"/><path d="M27 26v-5h10v5"/>' +
      '<path d="M29 21v-4h6v4"/><path d="M32 34s-4 4.4-4 7a4 4 0 0 0 8 0c0-2.6-4-7-4-7Z"/></svg>',
    spray:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M22 26h16l2 26a3 3 0 0 1-3 3.2H23A3 3 0 0 1 20 52l2-26Z"/>' +
      '<path d="M26 26v-7h8l4-5h-9a5 5 0 0 0-5 5v7"/>' +
      '<path d="M44 12h3M43 17l2.5 1.5M43 7 45.5 5.5"/></svg>',
    regalo:
      '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="14" y="26" width="36" height="10" rx="1.5"/><path d="M18 36v18a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V36"/>' +
      '<path d="M32 26v31"/><path d="M32 26c-2-7-7-10-12-9 1 6 6 9 12 9Z"/>' +
      '<path d="M32 26c2-7 7-10 12-9-1 6-6 9-12 9Z"/></svg>',
  };

  /* Paleta del placeholder según categoría */
  const PALETA_CAT = { plantas: 'salvia', macetas: 'arena', cuidados: 'verde', regalos: 'terra' };

  /* Bloque de imagen: dibujo de fondo + <img> que se muestra sola si el archivo existe */
  DR.media = (producto, claseExtra) => {
    const paleta = PALETA_CAT[producto.categoria] || 'salvia';
    const arte = ARTE[producto.arte] || ARTE.hoja;
    return (
      '<div class="ph ph--' + paleta + ' ' + (claseExtra || '') + '">' +
      '<span class="ph__arte">' + arte + '</span>' +
      '<img src="' + producto.img + '" alt="' + DR.escapar(producto.nombre) + '" loading="lazy" onerror="this.remove()">' +
      '</div>'
    );
  };

  /* Igual pero para fotos de secciones (hero, sobre, etc.) */
  DR.mediaSeccion = (ruta, alt, arte, paleta, claseExtra) => {
    return (
      '<div class="ph ph--' + (paleta || 'salvia') + ' ' + (claseExtra || '') + '">' +
      '<span class="ph__arte">' + (ARTE[arte] || ARTE.hoja) + '</span>' +
      '<img src="' + ruta + '" alt="' + DR.escapar(alt) + '" loading="lazy" onerror="this.remove()">' +
      '</div>'
    );
  };

  /* ─────────────────────────── TARJETA DE PRODUCTO ─────────────────────────── */

  DR.cardProducto = (p) => {
    const st = DR.estadoStock(p);
    const chip = st ? '<span class="chip-stock ' + st.clase + '">' + st.texto + '</span>' : '';
    const btn =
      p.stock > 0
        ? '<button class="prod-card__mas js-add" data-id="' + p.id + '" aria-label="Agregar ' + DR.escapar(p.nombre) + ' al carrito">' + I.mas + '</button>'
        : '';
    return (
      '<a class="prod-card" href="producto.html?p=' + p.id + '">' +
      '<div class="prod-card__media">' + DR.media(p) + chip + '</div>' +
      '<div class="prod-card__pie">' +
      '<span class="prod-card__datos"><span class="prod-card__nombre">' + DR.escapar(p.nombre) + '</span>' +
      '<span class="prod-card__precio">' + DR.money(p.precio) + '</span></span>' +
      btn +
      '</div></a>'
    );
  };

  /* ─────────────────────────── HEADER + MENÚ + FOOTER ─────────────────────────── */

  function logoHTML(clase) {
    return (
      '<a class="logo ' + (clase || '') + '" href="index.html" aria-label="De Raíz Floricultura — inicio">' +
      SPRIG +
      '<span class="logo__nombre">De Raíz</span>' +
      '<span class="logo__sub">Floricultura</span>' +
      '</a>'
    );
  }

  function headerHTML() {
    return (
      '<header class="topbar">' +
      '<div class="topbar__in">' +
      '<button class="topbar__btn js-abrir-menu" aria-label="Abrir menú">' + I.menu + '</button>' +
      logoHTML('logo--topbar') +
      '<a class="topbar__btn topbar__carrito" href="carrito.html" aria-label="Ver carrito">' +
      I.bolsa + '<span class="carrito-badge js-badge" hidden>0</span></a>' +
      '</div></header>'
    );
  }

  function drawerHTML() {
    const c = window.DR_CONFIG || {};
    const ig = c.instagram ? 'https://instagram.com/' + c.instagram : null;
    const fb = c.facebook ? 'https://facebook.com/' + c.facebook : null;
    return (
      '<div class="velo js-velo" hidden></div>' +
      '<aside class="drawer" aria-label="Menú principal">' +
      '<div class="drawer__cabeza">' + logoHTML('logo--drawer') +
      '<button class="topbar__btn drawer__cerrar js-cerrar-menu" aria-label="Cerrar menú">' + I.cerrar + '</button></div>' +
      '<p class="drawer__etiqueta">Tienda</p>' +
      '<nav class="drawer__nav">' +
      '<a href="tienda.html?cat=plantas">Plantas</a>' +
      '<a href="tienda.html?cat=macetas">Macetas</a>' +
      '<a href="tienda.html?cat=cuidados">Cuidados</a>' +
      '<a href="tienda.html?cat=regalos">Regalos</a>' +
      '</nav>' +
      '<p class="drawer__etiqueta">Nosotros</p>' +
      '<nav class="drawer__nav">' +
      '<a href="consejos.html">Consejos de cuidado</a>' +
      '<a href="index.html#vivero">El vivero</a>' +
      '<a href="index.html#visitanos">Contacto</a>' +
      '</nav>' +
      '<button class="drawer__wa js-wa" data-mensaje="¡Hola De Raíz! 🌿 Les escribo desde la web.">' +
      I.wa + ' WhatsApp</button>' +
      '<div class="drawer__redes">' +
      (ig ? '<a href="' + ig + '" target="_blank" rel="noopener" aria-label="Instagram">' + I.ig + '</a>' : '') +
      (fb ? '<a href="' + fb + '" target="_blank" rel="noopener" aria-label="Facebook">' + I.fb + '</a>' : '') +
      '</div>' +
      '</aside>'
    );
  }

  function footerHTML() {
    const c = window.DR_CONFIG || {};
    const anio = new Date().getFullYear();
    return (
      '<footer class="footer">' +
      '<div class="contenedor footer__in">' +
      logoHTML('logo--footer') +
      '<p class="footer__frase">Un poquito de verde cambia todo.</p>' +
      '<nav class="footer__nav">' +
      '<a href="tienda.html">Tienda</a>' +
      '<a href="consejos.html">Consejos</a>' +
      '<a href="index.html#vivero">El vivero</a>' +
      '<a href="index.html#visitanos">Contacto</a>' +
      '</nav>' +
      '<div class="footer__redes">' +
      (c.instagram ? '<a href="https://instagram.com/' + c.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + I.ig + '</a>' : '') +
      '<button class="js-wa" data-mensaje="¡Hola De Raíz! 🌿 Les escribo desde la web." aria-label="WhatsApp">' + I.wa + '</button>' +
      '</div>' +
      '<p class="footer__nota">© ' + anio + ' ' + (c.nombre || 'De Raíz Floricultura') + ' · ' + (c.direccion || '') + '</p>' +
      '</div></footer>'
    );
  }

  /* ─────────────────────────── TOAST ─────────────────────────── */

  let toastTimer = null;
  DR.toast = (msg, esAviso, accionHTML) => {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.classList.toggle('toast--aviso', !!esAviso);
    t.innerHTML = '<span>' + msg + '</span>' + (accionHTML || '');
    t.classList.remove('toast--visible');
    void t.offsetWidth; /* reinicia la transición */
    t.classList.add('toast--visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('toast--visible'), 3200);
  };

  DR.toastAgregado = () => {
    DR.toast('Agregado al carrito 🌿', false, '<a class="toast__accion" href="carrito.html">Ver carrito</a>');
  };

  /* ─────────────────────────── INICIALIZACIÓN ─────────────────────────── */

  function actualizarBadge() {
    const n = DR.carrito.cantidad();
    document.querySelectorAll('.js-badge').forEach((b) => {
      b.textContent = n;
      b.hidden = n === 0;
    });
  }

  DR.uiInit = () => {
    document.body.insertAdjacentHTML('afterbegin', headerHTML());
    document.body.insertAdjacentHTML('beforeend', drawerHTML() + footerHTML());

    /* textos que salen de config.js (dirección, horarios, etc.) */
    document.querySelectorAll('[data-config]').forEach((el) => {
      const valor = (window.DR_CONFIG || {})[el.dataset.config];
      if (valor) el.textContent = valor;
    });

    /* menú lateral */
    const drawer = document.querySelector('.drawer');
    const velo = document.querySelector('.js-velo');
    const abrir = (si) => {
      drawer.classList.toggle('drawer--abierto', si);
      velo.hidden = !si;
      document.body.classList.toggle('sin-scroll', si);
    };
    document.querySelector('.js-abrir-menu').addEventListener('click', () => abrir(true));
    drawer.querySelector('.js-cerrar-menu').addEventListener('click', () => abrir(false));
    velo.addEventListener('click', () => abrir(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') abrir(false); });

    /* botones + de las tarjetas (delegado, sirve en cualquier grilla) */
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-add');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        if (DR.carrito.agregar(btn.dataset.id, 1)) DR.toastAgregado();
        return;
      }
      const wa = e.target.closest('.js-wa');
      if (wa) {
        e.preventDefault();
        DR.abrirWa(wa.dataset.mensaje || '');
      }
    });

    document.addEventListener('dr:carrito', actualizarBadge);
    actualizarBadge();
  };
})();
