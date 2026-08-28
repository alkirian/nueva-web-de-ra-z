/* ============================================================
   DE RAÍZ — Lógica de cada página (no hace falta tocar este archivo)
   ============================================================ */

(function () {
  'use strict';

  /* ═══════════════════════ PORTADA ═══════════════════════ */

  function initHome() {
    /* categorías */
    const cats = document.getElementById('grid-categorias');
    if (cats) {
      const arteCat = {
        plantas: ['hoja', 'salvia'],
        macetas: ['maceta', 'arena'],
        cuidados: ['bolsa', 'verde'],
        regalos: ['regalo', 'terra'],
      };
      cats.innerHTML = Object.keys(DR_CATEGORIAS)
        .map((c) => {
          const [arte, paleta] = arteCat[c];
          return (
            '<a class="cat-card" href="tienda.html?cat=' + c + '">' +
            DR.mediaSeccion('assets/img/cat-' + c + '.jpg', DR_CATEGORIAS[c].nombre, arte, paleta) +
            '<span class="cat-card__label">' + DR_CATEGORIAS[c].nombre + '</span></a>'
          );
        })
        .join('');
    }

    /* favoritos */
    const fila = document.getElementById('favoritos-fila');
    if (fila) {
      const favoritos = DR_PRODUCTOS.filter((p) => p.destacado);
      fila.innerHTML = favoritos.map((p) => DR.cardProducto(p)).join('');
    }

    /* fotos de secciones */
    const mMacetas = document.getElementById('media-macetas');
    if (mMacetas) mMacetas.innerHTML = DR.mediaSeccion('assets/img/macetas.jpg', 'Nuestras macetas', 'maceta', 'arena');
    const mSobre = document.getElementById('media-sobre');
    if (mSobre) mSobre.innerHTML = DR.mediaSeccion('assets/img/sobre.jpg', 'El vivero De Raíz', 'hoja', 'salvia');

    /* mapa y cómo llegar */
    const consulta = encodeURIComponent(DR_CONFIG.mapsQuery || DR_CONFIG.direccion);
    const mapa = document.getElementById('mapa-iframe');
    if (mapa) mapa.src = 'https://www.google.com/maps?q=' + consulta + '&output=embed';
    const llegar = document.getElementById('btn-como-llegar');
    if (llegar) llegar.href = 'https://www.google.com/maps/search/?api=1&query=' + consulta;

    /* instagram */
    const ig = document.getElementById('btn-instagram');
    if (ig) {
      if (DR_CONFIG.instagram) ig.href = 'https://instagram.com/' + DR_CONFIG.instagram;
      else ig.hidden = true;
    }
  }

  /* ═══════════════════════ TIENDA ═══════════════════════ */

  function initTienda() {
    const cat = DR.param('cat');
    const filtro = DR.param('f');
    const mat = DR.param('mat');
    const ordenParam = DR.param('orden') || 'destacados';

    const titulo = document.getElementById('tienda-titulo');
    const sub = document.getElementById('tienda-sub');
    const chipsCat = document.getElementById('chips-categorias');
    const chipsSub = document.getElementById('chips-sub');
    const orden = document.getElementById('orden');
    const cuenta = document.getElementById('tienda-cuenta');
    const grid = document.getElementById('tienda-grid');
    const vacio = document.getElementById('tienda-vacio');

    /* título según lo que se está viendo */
    if (filtro && DR_FILTROS[filtro]) {
      titulo.textContent = DR_FILTROS[filtro];
      sub.textContent = 'Una selección pensada para vos.';
    } else if (cat && DR_CATEGORIAS[cat]) {
      titulo.textContent = DR_CATEGORIAS[cat].nombre;
      sub.textContent = DR_CATEGORIAS[cat].sub;
    } else {
      titulo.textContent = 'Toda la tienda';
      sub.textContent = 'Plantas, macetas y todo para cuidarlas.';
    }
    document.title = titulo.textContent + ' — De Raíz Floricultura';

    /* chips de categorías */
    const cats = [['', 'Todo']].concat(Object.keys(DR_CATEGORIAS).map((c) => [c, DR_CATEGORIAS[c].nombre]));
    chipsCat.innerHTML = cats
      .map(([valor, nombre]) => {
        const activo = (cat || '') === valor && !filtro;
        const href = valor ? 'tienda.html?cat=' + valor : 'tienda.html';
        return '<a class="chip' + (activo ? ' chip--activo' : '') + '" href="' + href + '">' + nombre + '</a>';
      })
      .join('');

    /* chips secundarios: materiales (en macetas) o el filtro activo */
    let subChips = '';
    if (cat === 'macetas') {
      subChips = Object.keys(DR_MATERIALES)
        .map((m) => {
          const activo = mat === m;
          const href = activo ? 'tienda.html?cat=macetas' : 'tienda.html?cat=macetas&mat=' + m;
          return '<a class="chip chip--mini' + (activo ? ' chip--activo' : '') + '" href="' + href + '">' + DR_MATERIALES[m] + '</a>';
        })
        .join('');
    } else if (filtro && DR_FILTROS[filtro]) {
      subChips =
        '<a class="chip chip--mini chip--activo" href="tienda.html?cat=plantas">' +
        DR_FILTROS[filtro] + ' ✕</a>';
    }
    chipsSub.innerHTML = subChips;
    chipsSub.hidden = !subChips;

    /* filtrado */
    function filtrar() {
      let lista = DR_PRODUCTOS.slice();
      if (filtro) lista = lista.filter((p) => (p.tags || []).includes(filtro));
      else if (cat) lista = lista.filter((p) => p.categoria === cat);
      if (cat === 'macetas' && mat) lista = lista.filter((p) => p.material === mat);

      const modo = orden.value;
      if (modo === 'precio-asc') lista.sort((a, b) => a.precio - b.precio);
      else if (modo === 'precio-desc') lista.sort((a, b) => b.precio - a.precio);
      else if (modo === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
      else lista.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
      return lista;
    }

    function render() {
      const lista = filtrar();
      grid.innerHTML = lista.map((p) => DR.cardProducto(p)).join('');
      cuenta.textContent = lista.length === 1 ? '1 producto' : lista.length + ' productos';
      vacio.hidden = lista.length > 0;
      grid.hidden = lista.length === 0;
    }

    orden.value = ordenParam;
    orden.addEventListener('change', () => {
      const url = new URL(location.href);
      url.searchParams.set('orden', orden.value);
      history.replaceState(null, '', url);
      render();
    });

    render();
  }

  /* ═══════════════════════ FICHA DE PRODUCTO ═══════════════════════ */

  function initProducto() {
    const p = DR.producto(DR.param('p'));
    const cont = document.getElementById('producto-cont');
    if (!p) {
      location.replace('tienda.html');
      return;
    }
    document.title = p.nombre + ' — De Raíz Floricultura';

    const catNombre = DR_CATEGORIAS[p.categoria] ? DR_CATEGORIAS[p.categoria].nombre : 'Tienda';
    const st = DR.estadoStock(p);
    const chip = st
      ? '<span class="chip-stock ' + st.clase + '">' + st.texto + '</span>'
      : '<span class="chip-stock chip-stock--ok">Disponible</span>';

    /* filas de cuidados / detalles */
    let detalles = '';
    if (p.cuidados) {
      detalles +=
        '<li>' + DR.icono('sol') + '<span>' + DR.escapar(p.cuidados.luz) + '</span></li>' +
        '<li>' + DR.icono('gota') + '<span>' + DR.escapar(p.cuidados.riego) + '</span></li>';
    }
    detalles += '<li>' + DR.icono('planta') + '<span>' + DR.escapar(p.tamano) + '</span></li>';

    const botones =
      p.stock > 0
        ? '<button class="btn btn--verde btn--block js-agregar">Agregar al carrito</button>'
        : '<button class="btn btn--verde btn--block" disabled>Sin stock por ahora</button>';

    const sugeridos = (p.sugeridos || [])
      .map((id) => DR.producto(id))
      .filter((s) => s && s.stock > 0);

    cont.innerHTML =
      '<a class="volver" href="tienda.html?cat=' + p.categoria + '">' + DR.icono('volver') + catNombre + '</a>' +
      '<div class="prod-detalle">' +
      '<div class="prod-detalle__media">' + DR.media(p, 'ph--grande') + '</div>' +
      '<div class="prod-detalle__info">' +
      '<div class="prod-detalle__cabeza"><h1>' + DR.escapar(p.nombre) + '</h1>' +
      '<span class="prod-detalle__precio">' + DR.money(p.precio) + '</span></div>' +
      chip +
      '<ul class="detalles-lista">' + detalles + '</ul>' +
      '<p class="prod-detalle__desc">' + DR.escapar(p.descripcion) + '</p>' +
      botones +
      '<button class="enlace-wa js-wa" data-mensaje="¡Hola De Raíz! 🌿 Quería consultar por: ' + DR.escapar(p.nombre) + '">' +
      DR.icono('wa') + '¿Dudas con este producto? Escribinos</button>' +
      '<div class="entrega-mini">' +
      '<span>' + DR.icono('vivero') + 'Retiro gratis en el vivero</span>' +
      '<span>' + DR.icono('envio') + 'Envíos a Las Piedras y zonas cercanas</span>' +
      '</div>' +
      '</div></div>' +
      (sugeridos.length
        ? '<section class="seccion seccion--sugeridos"><div class="seccion__cabeza"><h2 class="seccion__titulo">Combinalo con 🤎</h2></div>' +
          '<div class="fila-scroll">' + sugeridos.map((s) => DR.cardProducto(s)).join('') + '</div></section>'
        : '');

    const btnAgregar = cont.querySelector('.js-agregar');
    if (btnAgregar) {
      btnAgregar.addEventListener('click', () => {
        if (DR.carrito.agregar(p.id, 1)) DR.toastAgregado();
      });
    }
  }

  /* ═══════════════════════ CARRITO + CHECKOUT ═══════════════════════ */

  function initCarrito() {
    const cont = document.getElementById('carrito-cont');

    function renderVacio() {
      cont.innerHTML =
        '<div class="estado-centrado">' +
        '<span class="estado-centrado__icono">' + DR.icono('bolsa') + '</span>' +
        '<h1 class="seccion__titulo">Tu carrito está vacío</h1>' +
        '<p>Ningún espacio se llena solo: sumale un poquito de verde.</p>' +
        '<a class="btn btn--verde" href="tienda.html">Ver la tienda</a>' +
        '</div>';
    }

    function renderExito(pedido) {
      const items = pedido.items
        .map((i) => '<li><span>' + i.qty + '× ' + DR.escapar(i.nombre) + '</span><span>' + DR.money(i.precio * i.qty) + '</span></li>')
        .join('');
      const entrega = pedido.entrega === 'envio' ? 'Envío a domicilio · ' + DR.escapar(pedido.direccion) : 'Retiro en el vivero';
      const pago = pedido.pago === 'transferencia' ? 'Transferencia' : 'Efectivo';

      cont.innerHTML =
        '<div class="exito">' +
        '<span class="exito__check">' + DR.icono('check') + '</span>' +
        '<h1 class="seccion__titulo">¡Gracias por elegir De Raíz! 🌿</h1>' +
        '<p class="exito__nro">Pedido <strong>' + pedido.numero + '</strong> · ' + pedido.fecha + '</p>' +
        '<div class="resumen resumen--exito">' +
        '<ul class="resumen__items">' + items + '</ul>' +
        '<p class="resumen__total"><span>Total</span><span>' + DR.money(pedido.total) + '</span></p>' +
        '<p class="resumen__dato">' + entrega + ' · Pago: ' + pago + '</p>' +
        '</div>' +
        '<p class="exito__paso"><strong>¡Último paso!</strong> Envianos el pedido por WhatsApp (ya va escrito, solo tenés que tocar enviar) y te contactamos para coordinar la entrega.</p>' +
        '<button class="btn btn--verde btn--block js-wa" data-mensaje="' + DR.escapar(DR.pedidos.mensajeWa(pedido)) + '">' +
        'Enviar pedido por WhatsApp</button>' +
        '<a class="btn btn--borde-verde btn--block" href="index.html">Volver al inicio</a>' +
        '</div>';
      window.scrollTo({ top: 0 });
    }

    function renderCarrito() {
      const items = DR.carrito.items();
      if (!items.length) {
        renderVacio();
        return;
      }

      const filas = items
        .map((i) => {
          const p = DR.producto(i.id);
          return (
            '<div class="carro-item" data-id="' + p.id + '">' +
            '<a class="carro-item__media" href="producto.html?p=' + p.id + '">' + DR.media(p) + '</a>' +
            '<div class="carro-item__info">' +
            '<p class="carro-item__nombre">' + DR.escapar(p.nombre) + '</p>' +
            '<p class="carro-item__detalle">' + DR.escapar(p.tamano) + '</p>' +
            '<p class="carro-item__precio">' + DR.money(p.precio * i.qty) + '</p>' +
            '</div>' +
            '<div class="carro-item__lado">' +
            '<button class="carro-item__borrar" data-accion="sacar" aria-label="Sacar del carrito">' + DR.icono('tacho') + '</button>' +
            '<div class="stepper">' +
            '<button data-accion="menos" aria-label="Una unidad menos">' + DR.icono('menos') + '</button>' +
            '<span>' + i.qty + '</span>' +
            '<button data-accion="mas" aria-label="Una unidad más">' + DR.icono('mas') + '</button>' +
            '</div></div></div>'
          );
        })
        .join('');

      cont.innerHTML =
        '<h1 class="seccion__titulo">Mi carrito</h1>' +
        '<div id="lista-carrito">' + filas + '</div>' +
        '<div class="resumen" id="resumen-carrito">' +
        '<p class="resumen__total"><span>Subtotal</span><span>' + DR.money(DR.carrito.total()) + '</span></p>' +
        '<p class="resumen__dato">' + DR.escapar(DR_CONFIG.envioNota) + '</p>' +
        '</div>' +
        '<button class="btn btn--verde btn--block" id="btn-checkout">Finalizar compra</button>' +

        '<form class="checkout" id="checkout" hidden novalidate>' +
        '<h2 class="checkout__titulo">Finalizar compra</h2>' +

        '<section class="form-seccion">' +
        '<h3 class="form-seccion__titulo"><span>1</span>Tus datos</h3>' +
        '<label class="campo"><span>Nombre y apellido *</span><input type="text" name="nombre" autocomplete="name"></label>' +
        '<label class="campo"><span>Teléfono *</span><input type="tel" name="telefono" autocomplete="tel" inputmode="tel" placeholder="099 123 456"></label>' +
        '<label class="campo"><span>Correo electrónico (opcional)</span><input type="email" name="email" autocomplete="email"></label>' +
        '</section>' +

        '<section class="form-seccion">' +
        '<h3 class="form-seccion__titulo"><span>2</span>Forma de entrega</h3>' +
        '<label class="radio-card"><input type="radio" name="entrega" value="retiro" checked>' +
        '<span class="radio-card__texto"><strong>Retiro en el vivero</strong><small>' + DR.escapar(DR_CONFIG.direccion) + ' · sin costo</small></span></label>' +
        '<label class="radio-card"><input type="radio" name="entrega" value="envio">' +
        '<span class="radio-card__texto"><strong>Envío a domicilio</strong><small>' + DR.escapar(DR_CONFIG.envioNota) + '</small></span></label>' +
        '<label class="campo" id="campo-direccion" hidden><span>Dirección de entrega *</span><input type="text" name="direccion" autocomplete="street-address" placeholder="Calle, número, barrio"></label>' +
        '</section>' +

        '<section class="form-seccion">' +
        '<h3 class="form-seccion__titulo"><span>3</span>Forma de pago</h3>' +
        '<label class="radio-card"><input type="radio" name="pago" value="efectivo" checked>' +
        '<span class="radio-card__texto"><strong>Efectivo</strong><small>Al retirar o recibir tu pedido</small></span></label>' +
        '<label class="radio-card"><input type="radio" name="pago" value="transferencia">' +
        '<span class="radio-card__texto"><strong>Transferencia</strong><small>Te pasamos los datos al confirmar</small></span></label>' +
        '</section>' +

        '<button class="btn btn--verde btn--block" type="submit">Confirmar pedido</button>' +
        '<p class="checkout__nota">Al confirmar no pagás nada todavía: te contactamos para coordinar el pago y la entrega.</p>' +
        '</form>';

      /* steppers y borrar */
      cont.querySelector('#lista-carrito').addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-accion]');
        if (!btn) return;
        e.preventDefault();
        const id = btn.closest('.carro-item').dataset.id;
        const item = DR.carrito.items().find((i) => i.id === id);
        if (!item) return;
        if (btn.dataset.accion === 'mas') DR.carrito.poner(id, item.qty + 1);
        if (btn.dataset.accion === 'menos') DR.carrito.poner(id, item.qty - 1);
        if (btn.dataset.accion === 'sacar') DR.carrito.sacar(id);
        renderCarrito();
      });

      /* mostrar checkout */
      const form = cont.querySelector('#checkout');
      cont.querySelector('#btn-checkout').addEventListener('click', function () {
        this.hidden = true;
        form.hidden = false;
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        form.querySelector('[name=nombre]').focus({ preventScroll: true });
      });

      /* mostrar dirección solo con envío */
      const campoDir = form.querySelector('#campo-direccion');
      form.querySelectorAll('[name=entrega]').forEach((r) =>
        r.addEventListener('change', () => {
          campoDir.hidden = form.entrega.value !== 'envio';
        })
      );

      /* confirmar */
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const datos = {
          nombre: form.nombre.value.trim(),
          telefono: form.telefono.value.trim(),
          email: form.email.value.trim(),
          entrega: form.entrega.value,
          direccion: form.direccion.value.trim(),
          pago: form.pago.value,
        };

        let error = null;
        if (!datos.nombre) error = [form.nombre, 'Contanos tu nombre 🙂'];
        else if (!/^[\d\s()+-]{7,}$/.test(datos.telefono)) error = [form.telefono, 'Necesitamos un teléfono válido para coordinar'];
        else if (datos.entrega === 'envio' && !datos.direccion) error = [form.direccion, '¿A qué dirección lo llevamos?'];

        form.querySelectorAll('.campo--error').forEach((c) => c.classList.remove('campo--error'));
        if (error) {
          error[0].closest('.campo').classList.add('campo--error');
          error[0].focus();
          DR.toast(error[1], true);
          return;
        }

        const pedido = DR.pedidos.crear(datos);
        if (pedido) {
          history.replaceState(null, '', 'carrito.html#gracias');
          renderExito(pedido);
        }
      });
    }

    /* estado inicial */
    const ultimo = DR.pedidos.ultimo();
    if (location.hash === '#gracias' && ultimo && !DR.carrito.cantidad()) renderExito(ultimo);
    else renderCarrito();
  }

  /* ═══════════════════════ CONSEJOS ═══════════════════════ */

  function initConsejos() {
    if (location.hash) {
      const abierto = document.querySelector(location.hash);
      if (abierto && abierto.tagName === 'DETAILS') {
        abierto.open = true;
        abierto.scrollIntoView({ block: 'start' });
      }
    }
  }

  /* ═══════════════════════ ARRANQUE ═══════════════════════ */

  document.addEventListener('DOMContentLoaded', () => {
    DR.uiInit();
    const pagina = document.body.dataset.page;
    if (pagina === 'home') initHome();
    if (pagina === 'tienda') initTienda();
    if (pagina === 'producto') initProducto();
    if (pagina === 'carrito') initCarrito();
    if (pagina === 'consejos') initConsejos();
  });
})();
