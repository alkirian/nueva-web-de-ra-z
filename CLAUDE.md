# De Raíz Floricultura — notas para el desarrollo

Sitio estático mobile-first para un vivero en Las Piedras, Canelones (UY).
Sin build, sin dependencias, sin backend: HTML + CSS + JS planos (namespace global `DR`).
Todo el texto en español rioplatense (voseo). Los comentarios del código, en español:
la dueña del vivero (no técnica) edita `config.js` y `products.js` a mano.

## Arquitectura

- Páginas: `index.html` (10 secciones), `tienda.html` (filtros por querystring:
  `?cat=`, `?f=` tag, `?mat=`, `?orden=`), `producto.html?p=<id>`, `carrito.html`
  (carrito + checkout + éxito en `#gracias`), `consejos.html`.
- JS en orden de carga: `config.js` (datos del vivero) → `products.js` (catálogo,
  `DR_PRODUCTOS`) → `store.js` (carrito en localStorage `dr_carrito`, pedidos,
  WhatsApp) → `ui.js` (header/drawer/footer inyectados, iconos, placeholders,
  tarjeta de producto) → `main.js` (init por `body[data-page]`).
- Scripts clásicos (no módulos) para que funcione con doble clic en `file://`.

## Decisiones clave

- **Pedidos sin backend**: al confirmar, el pedido se guarda en localStorage y el
  cliente lo envía por WhatsApp con mensaje prearmado (`DR.pedidos.mensajeWa`).
  Supabase quedó como paso futuro (hay MCP conectado; el único proyecto existente,
  "Cadence v2", es de otra cosa — NO usarlo).
- **Sin imágenes por decisión del usuario** (2026-08): pidió no usar Magnific/Freepik.
  Sistema de placeholders: `.ph` con gradiente por categoría + SVG botánico línea
  (`DR.media`); el `<img>` con `onerror="this.remove()"` se muestra solo si el
  archivo existe. Rutas esperadas en README. Hay 7 imágenes IA ya generadas en la
  cuenta Freepik del usuario por si las quiere.
- WhatsApp/Instagram sin configurar: sentinel `598XXXXXXXX` en config → los botones
  muestran un toast avisando en vez de abrir un número equivocado.
- Estética del mockup de referencia: crema `#F3EEE2`, verde oliva `#3E4A32`/`#333D29`,
  serif Cormorant Garamond (títulos) + Karla (UI), botones pill uppercase.

## Pendiente / ideas

- Número real de WhatsApp, usuario de IG, dirección exacta y precios reales.
- Fotos reales del vivero (rutas en README).
- Futuro: Supabase (productos + pedidos + stock), Mercado Pago, dominio.
