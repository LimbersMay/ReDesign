# Iconografía

**Lucide**, siempre con su trazo por defecto (2).

| Entorno | Paquete | Ejemplo |
|---|---|---|
| Angular | `@ng-icons/lucide` + `@ng-icons/core` | `<ng-icon name="lucideTrash2" size="13" />` |
| React | `lucide-react` | `<Trash2 size={13} />` |
| Wireframes / galería | `lucide` (UMD) | `<i data-lucide="trash-2" data-size="13"></i>` + `lucide.createIcons()` |

## Tamaño por contenedor

| Contenedor | px |
|---|---|
| `re-icon-btn` (28) · `re-input-group` · `re-menu__item` · logo del header | 13 |
| `re-btn` (30) · icono de grupo del árbol · candado de fila | 12 |
| `re-btn--sm` / `--xs` · `re-icon-btn--sm` · `re-dropdown` (check, chevron) · chevron del árbol | 11 |
| `re-btn--2xs` · `re-segmented__item` · status bar | 10 |
| Título de diálogo | 14 |
| `re-empty__icon` | 18 |

## Vocabulario común

Para que la misma acción tenga el mismo icono en toda la suite:

| Acción / concepto | Icono |
|---|---|
| Ajustes | `settings` |
| Añadir | `plus` |
| Editar | `square-pen` (tarjetas) · `pencil` (filas densas) |
| Eliminar | `trash-2` |
| Limpiar · vaciar | Sin icono: el verbo, la posición y la cifra dicen el alcance (D16) |
| Copiar | `copy` |
| Exportar / importar | `download` / `upload` |
| Ayuda | `circle-help` · Atajos: `keyboard` |
| Tema claro / oscuro / sistema | `sun` / `moon` / `monitor` |
| Idioma | `languages` |
| Con candado · sin candado | `lock` (`slate-700`) · `lock-open` (`slate-300`): el estado lo da la forma, no el color |
| Lista blanca · lista negra | `shield-check` (`emerald`) · `shield-x` (`rose`) |
| Rastreadores | `shield-alert` (neutro) |
| Cookie de sesión · fecha fija | `log-out` · `calendar` |
| Información · aviso | `info` · `triangle-alert` |
| Peligro / alerta | `triangle-alert` |
| Expandir / contraer todo | `chevrons-up-down` / `chevrons-down-up` |
| Buscar · cerrar | `search` · `x` |

## Color

Los iconos son `slate-400` por defecto (en menús, inputs, árboles y botones secundarios). Solo toman
color cuando el icono **es** la señal: un rol (`rose`, `emerald`) o el hover de un `re-icon-btn`
([color.md §2](color.md)). Un icono de tipo (carpeta, globo, base de datos) nunca lleva la marca.

