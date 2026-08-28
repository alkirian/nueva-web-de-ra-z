/* ============================================================
   DE RAÍZ FLORICULTURA — Configuración general
   ------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para cambiar
   datos de contacto, horarios y textos generales del vivero.
   ============================================================ */

window.DR_CONFIG = {
  nombre: 'De Raíz Floricultura',

  // ⚠️ COMPLETAR: número de WhatsApp con código de país, sin "+", sin espacios.
  // Ejemplo Uruguay: '59899123456'
  whatsapp: '598XXXXXXXX',

  // ⚠️ CONFIRMAR: usuario de Instagram (sin @)
  instagram: 'deraiz.floricultura',

  // Usuario de Facebook (opcional, dejar '' si no hay)
  facebook: '',

  // Dirección y ubicación
  direccion: 'Las Piedras, Canelones',
  mapsQuery: 'Las Piedras, Canelones, Uruguay', // lo que se busca en Google Maps

  // Horarios de atención
  horarios: 'Lunes a sábados de 9 a 18 hs',

  // Nota de envíos (aparece en el carrito y en la home)
  envioNota: 'Envíos a Las Piedras y zonas cercanas. El costo se coordina al confirmar el pedido.',

  // Datos para transferencia (se muestran al elegir ese medio de pago).
  // Dejar '' para mostrar solo "te pasamos los datos al confirmar".
  transferenciaNota: '',

  // Moneda
  moneda: '$', // pesos uruguayos
};
