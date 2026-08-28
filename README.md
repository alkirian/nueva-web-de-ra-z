# 🌿 De Raíz Floricultura — Sitio web

Web mobile-first del vivero: tienda con carrito, checkout con retiro o envío,
consejos de cuidado e integración con Instagram y WhatsApp.

**Ya está online en:** <https://alkirian.github.io/nueva-web-de-ra-z/>

No necesita instalación ni programas: son archivos estáticos. Para verla en
la compu sin internet, doble clic en `index.html`.

---

## 📁 Qué es cada cosa

| Archivo | Qué es | ¿Se toca? |
|---|---|---|
| `index.html` | Página de inicio | Solo textos, si querés |
| `tienda.html` | Tienda con filtros | No |
| `producto.html` | Ficha de cada producto | No |
| `carrito.html` | Carrito + finalizar compra | No |
| `consejos.html` | Consejos de cuidado | Solo textos, si querés |
| `assets/js/config.js` | **⚙️ Datos del vivero** (WhatsApp, Instagram, dirección, horarios) | **SÍ** |
| `assets/js/products.js` | **🪴 El catálogo** (productos, precios, stock) | **SÍ** |
| `assets/img/` | **📷 Las fotos** | **SÍ** |
| El resto (`css`, otros `js`) | Diseño y funcionamiento | No |

---

## ⚙️ 1. Lo primero: completar `assets/js/config.js`

Abrí el archivo con el Bloc de notas y completá:

- `whatsapp`: el número con código de país, sin `+` ni espacios. Ej: `'59899123456'`
  *(hasta que no lo completes, los botones de WhatsApp avisan que falta configurarlo)*
- `instagram`: el usuario de la cuenta, sin `@`
- `direccion`, `mapsQuery`, `horarios`: revisá que estén bien

## 🪴 2. Editar productos: `assets/js/products.js`

Cada producto es un bloque `{ ... }`. Al principio del archivo hay una guía de
cada campo. Lo del día a día:

- **Cambiar precio** → editá el número en `precio: 550,`
- **Se agotó algo** → poné `stock: 0` (queda visible como "Sin stock")
- **Producto nuevo** → copiá un bloque entero, pegalo al final y cambiá los datos
  (el `id` tiene que ser único y sin espacios)
- **Quedan pocas** → con `stock: 3` o menos aparece "¡Últimas unidades!" solo

Guardá el archivo y listo: la web se actualiza al recargar.

## 📷 3. Las fotos

**Ya hay 6 fotos de ambiente puestas** (generadas con IA, como relleno
provisorio hasta tener las del vivero):

- `hero.jpg` → la portada
- `sobre.jpg` → "Somos De Raíz"
- `macetas.jpg` → la sección de macetas
- `cat-plantas.jpg`, `cat-macetas.jpg`, `cat-regalos.jpg` → 3 categorías

Los **productos y la categoría "Cuidados"** muestran dibujos botánicos, que
se ven prolijos y combinan con el diseño.

**Para reemplazar cualquiera por una foto real**: guardala en `assets/img/`
con el mismo nombre, pisando la que está. Se actualiza sola.

**Para ponerle foto a un producto**: guardala en `assets/img/productos/` con
el `id` del producto + `.jpg`. Por ejemplo `anthurium.jpg`, `potus.jpg`
(los `id` están en `assets/js/products.js`). Mientras no exista el archivo,
se muestra el dibujo.

Consejos: fotos cuadradas para productos, con buena luz natural. Idealmente
menos de 500 KB cada una (se pueden achicar en [squoosh.app](https://squoosh.app)).

## 🌙 Modo claro y modo oscuro

La web tiene los dos. Arriba a la derecha, al lado del carrito, hay un botón
con una luna (o un sol) para cambiar:

- **Modo claro**: el beige y verde de siempre.
- **Modo oscuro**: fondo verde profundo con textos claros, más cómodo de noche.

La primera vez se usa el modo que tenga configurado el celular o la compu del
cliente. Si lo cambia con el botón, queda guardado en su navegador y se
respeta en todas las páginas y las próximas visitas.

## 🛒 Cómo llegan los pedidos

1. El cliente arma el carrito, completa sus datos, elige **retiro o envío**
   y **efectivo o transferencia**.
2. Al confirmar ve la pantalla de "¡Gracias por elegir De Raíz!" con su
   número de pedido, y un botón que le abre WhatsApp **con el pedido ya
   escrito** (productos, total, dirección, teléfono). Solo toca "enviar".
3. Te llega el pedido completo al WhatsApp del vivero, listo para coordinar.

## 📲 Instagram + WhatsApp

- **Cada producto tiene su propio link** para compartir en historias o en la
  bio: `producto.html?p=anthurium` (el `id` del producto después de `?p=`).
- Otros links útiles para la bio o historias:
  - `tienda.html?cat=plantas` → solo plantas (igual con `macetas`, `cuidados`, `regalos`)
  - `tienda.html?f=poca-luz` → plantas para poca luz
  - `consejos.html` → los consejos de cuidado

## 🚀 La web ya está online

**Dirección de la web:**

```
https://alkirian.github.io/nueva-web-de-ra-z/
```

Esa es la dirección para poner en la bio de Instagram y compartir por WhatsApp.

Repositorio: <https://github.com/alkirian/nueva-web-de-ra-z>

### Actualizar la web

Cada vez que cambies precios, stock, productos o fotos:
clic derecho en `actualizar-web.ps1` → *Ejecutar con PowerShell*.
En 1 o 2 minutos los cambios se ven online.

> 💡 Más adelante se puede conectar un dominio propio tipo `deraiz.uy`
> desde la configuración del repositorio, sección *Pages*.

## 🔜 Próximos pasos posibles

- **Base de datos (Supabase, gratis)**: los pedidos quedan guardados en una
  tabla, el stock se descuenta solo y los productos se editan desde una
  planilla online en vez del archivo. Ideal cuando el catálogo crezca.
- **Pagos online (Mercado Pago)**: cobrar directo desde la web.
- **Dominio propio** (tipo `deraiz.uy`) y perfil de Google Maps del vivero.
