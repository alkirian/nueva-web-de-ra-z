/* ============================================================
   DE RAÍZ — Carrito y utilidades (no hace falta tocar este archivo)
   ============================================================ */

window.DR = window.DR || {};

(function () {
  const CLAVE_CARRITO = 'dr_carrito';
  const CLAVE_PEDIDO  = 'dr_ultimo_pedido';

  /* ---------- helpers generales ---------- */

  DR.producto = (id) => (window.DR_PRODUCTOS || []).find((p) => p.id === id) || null;

  DR.money = (n) => '$' + Number(n || 0).toLocaleString('es-UY');

  DR.param = (nombre) => new URLSearchParams(location.search).get(nombre);

  DR.escapar = (t) =>
    String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* Estado de stock → { clase, texto } o null si hay stock normal */
  DR.estadoStock = (p) => {
    if (!p) return null;
    if (p.stock <= 0) return { clase: 'chip-stock--sin', texto: 'Sin stock' };
    if (p.stock <= 3) return { clase: 'chip-stock--pocas', texto: '¡Últimas unidades!' };
    return null;
  };

  /* ---------- WhatsApp ---------- */

  DR.waConfigurado = () => {
    const n = (window.DR_CONFIG && DR_CONFIG.whatsapp) || '';
    return /^[0-9]{8,15}$/.test(n);
  };

  DR.waLink = (mensaje) => {
    if (!DR.waConfigurado()) return null;
    const base = 'https://wa.me/' + DR_CONFIG.whatsapp;
    return mensaje ? base + '?text=' + encodeURIComponent(mensaje) : base;
  };

  /* Abre WhatsApp o avisa que falta configurar el número */
  DR.abrirWa = (mensaje) => {
    const link = DR.waLink(mensaje);
    if (link) {
      window.open(link, '_blank', 'noopener');
    } else {
      DR.toast('Falta configurar el número de WhatsApp en assets/js/config.js', true);
    }
  };

  /* ---------- carrito ---------- */

  function leerCarrito() {
    try {
      const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || '[]');
      return Array.isArray(datos) ? datos.filter((i) => DR.producto(i.id) && i.qty > 0) : [];
    } catch (e) {
      return [];
    }
  }

  function guardarCarrito(items) {
    try { localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items)); } catch (e) {}
    document.dispatchEvent(new CustomEvent('dr:carrito'));
  }

  DR.carrito = {
    items: () => leerCarrito(),

    cantidad: () => leerCarrito().reduce((s, i) => s + i.qty, 0),

    total: () =>
      leerCarrito().reduce((s, i) => {
        const p = DR.producto(i.id);
        return s + (p ? p.precio * i.qty : 0);
      }, 0),

    agregar(id, qty = 1) {
      const p = DR.producto(id);
      if (!p) return false;
      if (p.stock <= 0) {
        DR.toast('Este producto está sin stock por ahora 😔', true);
        return false;
      }
      const items = leerCarrito();
      const existente = items.find((i) => i.id === id);
      const actual = existente ? existente.qty : 0;
      if (actual + qty > p.stock) {
        DR.toast('No nos quedan más unidades de este producto 🌿', true);
        return false;
      }
      if (existente) existente.qty += qty;
      else items.push({ id, qty });
      guardarCarrito(items);
      return true;
    },

    poner(id, qty) {
      let items = leerCarrito();
      const p = DR.producto(id);
      if (!p) return;
      qty = Math.max(0, Math.min(qty, p.stock));
      if (qty === 0) items = items.filter((i) => i.id !== id);
      else {
        const it = items.find((i) => i.id === id);
        if (it) it.qty = qty;
        else items.push({ id, qty });
      }
      guardarCarrito(items);
    },

    sacar(id) {
      guardarCarrito(leerCarrito().filter((i) => i.id !== id));
    },

    vaciar() {
      guardarCarrito([]);
    },
  };

  /* ---------- pedidos ---------- */

  DR.pedidos = {
    crear(datos) {
      // datos = { nombre, telefono, email, entrega, direccion, pago }
      const items = leerCarrito().map((i) => {
        const p = DR.producto(i.id);
        return { id: i.id, nombre: p.nombre, tamano: p.tamano, precio: p.precio, qty: i.qty };
      });
      if (!items.length) return null;

      const pedido = {
        numero: 'DR-' + String(Date.now()).slice(-5),
        fecha: new Date().toLocaleDateString('es-UY', { day: 'numeric', month: 'long', year: 'numeric' }),
        items,
        total: items.reduce((s, i) => s + i.precio * i.qty, 0),
        ...datos,
      };
      try { localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(pedido)); } catch (e) {}
      DR.carrito.vaciar();
      return pedido;
    },

    ultimo() {
      try { return JSON.parse(localStorage.getItem(CLAVE_PEDIDO) || 'null'); }
      catch (e) { return null; }
    },

    /* Mensaje de WhatsApp con el pedido armado */
    mensajeWa(pedido) {
      const lineas = pedido.items.map(
        (i) => `• ${i.qty}× ${i.nombre} (${i.tamano}) — ${DR.money(i.precio * i.qty)}`
      );
      const entrega =
        pedido.entrega === 'envio'
          ? `Envío a domicilio — ${pedido.direccion}`
          : 'Retiro en el vivero';
      const pago = pedido.pago === 'transferencia' ? 'Transferencia' : 'Efectivo';

      return [
        `¡Hola De Raíz! 🌿 Quiero confirmar mi pedido *${pedido.numero}*:`,
        '',
        ...lineas,
        '',
        `*Total: ${DR.money(pedido.total)}*`,
        '',
        `Entrega: ${entrega}`,
        `Pago: ${pago}`,
        `Nombre: ${pedido.nombre}`,
        `Teléfono: ${pedido.telefono}`,
        pedido.email ? `Email: ${pedido.email}` : null,
      ].filter((l) => l !== null).join('\n');
    },
  };
})();
