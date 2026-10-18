# Color

## 1. Principio

**El color es una señal, no un relleno.** Las superficies son neutras. El color aparece solo en lo que
significa algo: la marca (la acción principal y lo que está encendido), un rol (peligro, éxito, aviso)
o una categoría. La identidad de un producto la da **una** acción de marca por pantalla, no que todo
tenga su tono: si todo es marca, nada destaca.

## 2. Política de acento: qué lleva color y qué no

Es la regla que más se rompe, porque «poner el color de la marca» parece dar identidad. No la da:
compite con la acción que el usuario viene a hacer.

### Lleva marca (y nada más)

| Elemento | Cómo |
|---|---|
| **La** acción principal de la vista o del diálogo, una sola | `re-btn--primary` («Añadir», «Guardar») |
| Controles booleanos encendidos | `re-switch` activo, `re-checkbox` marcado |
| Foco de teclado | anillo `--re-ring` |
| Estados transitorios: hover de botones de icono y de menú, opción elegida en un dropdown **abierto** | los que traen `re-icon-btn`, `re-menu`, `re-dropdown` |
| Enlaces de texto | `re-link` |
| Pestaña subrayada activa dentro de un diálogo | `re-tabs__item` (solo el subrayado y su icono) |

### No lleva marca nunca

| Elemento | En su lugar |
|---|---|
| Opción activa de un `re-segmented`: vistas, ámbitos, idioma, tema, modos | **Elevación**: `bg-card` (`slate-300` en oscuro) + `shadow-xs` + `text-slate-800`. Sin borde ni texto de color |
| Botones secundarios y sus iconos («Proteger todas», «Exportar») | `re-btn--secondary`, icono `slate-400` |
| Iconos de tipo o decorativos (carpeta, globo, galleta) | `slate-400` (`re-tree__icon`) |
| Datos: dominios, claves, valores, cifras | `slate-*` |
| Badges de formato o de conteo (`{JWT}`, `COMODÍN`, `3`) | `re-badge` neutro |
| Estados persistentes de una fila (candado puesto) | forma y peso: `lock` `slate-700` frente a `lock-open` `slate-300` |
| Logo del header | el asset del producto, sin baldosa tintada |
| Barra lateral de una tarjeta activa | la categoría o el estado (`emerald` en vivo), no la marca |

### Roles: solo donde el significado es el mensaje

- **rose**: lo destructivo (hover de eliminar, `re-btn--danger*`, el «Limpiar» de los rastreadores) y los
  errores.
- **amber**: aviso. Los **rastreadores** avisan, no destruyen: el icono y el conteo de su grupo van en
  `amber` (`re-tree__icon--warning`, `re-badge--warning`). Es el único caso en que un color está en
  reposo dentro de una lista, porque avisar de ellos es el producto. Sus filas no se tiñen: tienen el
  mismo hover que las demás.
- **emerald**: en vivo (`re-dot--live`, `re-switch--live`) y «protegido por lista blanca» (`re-pill--success`).
- En un segmented cuyas opciones **son** roles (Lista blanca · Lista negra; en ReRoute, Request ·
  Response del mock), la opción activa pinta del rol **el texto y el icono, nunca el borde**:
  `re-segmented__item--success` / `--danger`.

### Prueba de los tres segundos

Mira la pantalla en reposo, sin hover ni foco. Puede haber, como mucho: **un** botón primario, los
controles encendidos y las señales de rol. Cualquier otro elemento con el color de la marca sobra.

## 3. Paleta (cerrada)

| Grupo | Clases | Para qué |
|---|---|---|
| Superficies | `bg-background`, `bg-card`, `bg-overlay`, `bg-inverse` | Fondo de la ventana · tarjetas, header, footer, menús · velo de diálogo · toasts |
| Neutros | `slate-50…950` | Todo lo que no es señal (ver §3) |
| Marca | `brand-50…800`, `bg-primary`, `text-primary-foreground` | Lo que dice §2, nada más |
| Peligro | `rose-*`, `bg-destructive` | Eliminar, purgar, errores |
| Éxito / en vivo | `emerald-*` | Estado activo (punto en vivo), protegido, lista blanca |
| Aviso | `amber-*` | Advertencias que no bloquean |
| Categorías | `orange`, `teal`, `sky`, `violet`, `purple` | Tipos dentro de un producto (ReRoute: headers, params…) |

Los roles **no se reutilizan como categoría**: un tipo de regla no puede ser `rose`, porque `rose`
significa «destructivo» en toda la suite.

## 4. Neutros: qué tono para qué

| Tono | Uso |
|---|---|
| `slate-50` | Fondo de inputs, superficies hundidas, nivel 2 del árbol |
| `slate-100` | Hover, chips, fondo de badges neutros |
| `slate-200` | Bordes y divisores |
| `slate-300` | Switch apagado, borde de checkbox, barra de tarjeta pausada |
| `slate-400` | Iconos inactivos, placeholders, títulos de sección |
| `slate-500` | Texto secundario |
| `slate-600` / `slate-700` | Texto de controles y cuerpo |
| `slate-800` | Títulos y texto principal |

En oscuro la escala se **invierte**: `slate-50` pasa a ser oscuro y `slate-800` claro. Por eso la
misma clase funciona en los dos temas y no hace falta `dark:`.

## 5. Marcas

Una marca son cuatro variables en `tokens/brands/<producto>.css`:

| Variable | Qué hace |
|---|---|
| `--re-brand-hue` | Tono OKLCH en claro (0–360) |
| `--re-brand-l-shift` | Luz extra para los tonos 400–800 (los tonos cálidos la necesitan). El primario no cambia: L 0.53 en todas las marcas |
| `--re-brand-c-scale` | Multiplica la saturación |
| `--re-brand-dark` | El pastel del tema oscuro; los demás tonos se derivan de él |

| Producto | Tono | Pastel oscuro | Estado |
|---|---|---|---|
| ReRoute | 225 · zafiro | `#85c1dc` | Definitivo |
| ReTabs | 190 · teal | `#81c8be` | Definitivo |
| ReLink | 280 · lavanda | `#babbf1` | Pendiente (D9) |
| ReBooks | 300 · malva | `#ca9ee6` | Pendiente (D9) |
| ReSession | 75 · ámbar | `#e5c890` | **Provisional** (D9): choca con el rol de aviso |

**Reglas para una marca nueva**

- Debe estar a ≥ 30° de los roles (rose 25, amber 75, emerald 155) y de las demás marcas.
- El texto del botón primario es **blanco en claro** y oscuro (`#232634`) sobre el pastel en oscuro, en
  todas las marcas. Con el primario a L 0.53 el blanco pasa AA en cualquier tono; si una marca no
  llegara, se cambia su tono o su saturación, no el color del texto.
- Se prueba en la galería, en claro y en oscuro, antes de publicarla.

## 6. Recetas

| Quiero… | Clases |
|---|---|
| Opción activa de un selector | `re-segmented__item` con `aria-pressed` (neutro, ver §2) |
| Hover de un botón de icono | `re-icon-btn` (la marca aparece solo en hover) |
| Badge de peligro | `re-badge re-badge--danger` |
| Botón de icono destructivo | `re-icon-btn re-icon-btn--danger` |
| Punto en vivo | `re-dot re-dot--live` |
| Panel de código oscuro en los dos temas | `re-code-surface bg-slate-800 text-slate-100` |
