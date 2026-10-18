# Página de ayuda y atajos

La ayuda se abre **en una pestaña** (no cabe en el popup), desde el menú de ajustes y desde el enlace de
la status bar. Es una página completa: puede usar `text-base`–`text-2xl` en los títulos (declárala en
`pages` de `.redesignrc.json`).

## Estructura (orden fijo)

1. **Bienvenida**: qué hace el producto en una frase y cómo abrirlo («Alt+Shift+S abre ReSession»).
2. **Garantías**: las del producto, con la misma frase que en la status bar, ampliada
   ([guarantee.md](guarantee.md)).
3. **Conceptos**: uno por bloque, con su icono del vocabulario común.
4. **Atajos**: tabla `acción · combinación` con `re-kbd-combo`; los atajos sin asignar dicen «Sin
   asignar». Un botón abre `chrome://extensions/shortcuts` para cambiarlos.
5. **Alcance y límites**: qué no hace el producto.
6. **Versión y enlaces**.

Índice lateral con anclas (`#help-shortcuts`…) para enlazar desde el popup a una sección concreta.

## Atajos (convención de la suite)

| Atajo | Acción |
|---|---|
| `Alt+Shift+<letra>` | Abrir el producto (`_execute_action`). Letra = inicial del producto (R, S, T, L, B) |
| `Alt+Shift+P` | Pausar/reanudar el producto, si tiene interruptor general |

Dentro del popup (sin `commands`): `/` enfoca la búsqueda · `Esc` cierra el overlay de arriba.
