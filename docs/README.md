# ReDesign · índice

| Capa | Qué contiene | Quién la cambia |
|---|---|---|
| [Fundamentos](foundations/) | Color, tipografía, espacio, iconos, movimiento y accesibilidad, contenido | Solo este repo |
| [Componentes](components/) | Piezas compartidas, con su contrato y su HTML de referencia | Solo este repo |
| [Patrones](patterns/) | Flujos que combinan componentes: menú de ajustes, ayuda, garantías, borrados, editores | Solo este repo |
| [Productos](products/) | Marca, ventana, componentes firma, excepciones y deuda de cada producto | El producto, vía PR aquí |
| [Decisiones](decisions.md) | Por qué el sistema es así (D1…) | Solo este repo |

## Fundamentos

- [Color](foundations/color.md): paleta cerrada, roles, marcas, oscuro.
- [Tipografía](foundations/typography.md): tres tamaños, mono a 11px.
- [Espacio y layout](foundations/layout.md): ventana, alturas, radios, sangrías.
- [Iconografía](foundations/iconography.md): Lucide y tamaños por contenedor.
- [Movimiento y accesibilidad](foundations/motion-a11y.md).
- [Contenido](foundations/content.md): verbos, conteos, garantías, i18n.

## Componentes

| Componente | Clase raíz | Uso |
|---|---|---|
| [ReHeader / ReStatusBar](components/ReHeader.md) | `re-header`, `re-statusbar` | Cabecera y barra inferior de la ventana |
| [ReButton](components/ReButton.md) | `re-btn`, `re-icon-btn` | Acciones |
| [ReInput](components/ReInput.md) | `re-input-group`, `re-textarea`, `re-field` | Texto, búsqueda, selects en línea |
| [ReSwitch](components/ReSwitch.md) | `re-switch`, `re-checkbox`, `re-option` | Booleanos |
| [ReBadge](components/ReBadge.md) | `re-badge`, `re-pill`, `re-kbd`, `re-dot` | Datos técnicos, estados, atajos |
| [ReSegmented](components/ReSegmented.md) | `re-segmented`, `re-tabs` | Cambiar vista o ámbito |
| [ReDropdown](components/ReDropdown.md) | `re-dropdown` | Elegir uno de una lista (con acciones por fila) |
| [ReMenu](components/ReMenu.md) | `re-menu` | Menú anclado a un botón (ajustes) |
| [ReCard](components/ReCard.md) | `re-card` | Elemento repetible con identidad (regla, libro, automatización) |
| [ReList](components/ReList.md) | `re-list` | Lista corta de filas ligeras |
| [ReTree](components/ReTree.md) | `re-tree`, `re-batchbar` | Datos jerárquicos densos (cientos de filas) |
| [ReDialog](components/ReDialog.md) | `re-dialog` | Editores y confirmaciones |
| [ReToast](components/ReToast.md) | `re-toast` | Resultado de una acción, con Deshacer |
| [ReEmptyState / ReNotice](components/ReFeedback.md) | `re-empty`, `re-notice` | Vacíos y mensajes en línea |

## Patrones

- [Menú de ajustes](patterns/settings-menu.md): idioma, tema, exportar/importar, ayuda y atajos.
- [Página de ayuda y atajos](patterns/help-page.md).
- [Garantías del producto](patterns/guarantee.md): decir una vez lo que nunca pasa.
- [Acciones destructivas](patterns/destructive-actions.md): confirmar, deshacer o ninguna de las dos.
- [Diálogo editor](patterns/editor-dialog.md): estructura de un formulario en el popup.

## Productos

[ReRoute](products/reroute.md) · [ReSession](products/resession.md) · [ReTabs](products/retabs.md) ·
[ReLink](products/relink.md) · [ReBooks](products/rebooks.md)
