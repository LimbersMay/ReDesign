# Menú de ajustes (engranaje)

Todos los productos tienen el mismo engranaje, **siempre el último botón del header**, y el mismo
menú. Es una de las cosas que hacen que la suite se sienta como una familia: quien aprende uno
encuentra los ajustes en el mismo sitio en todos.

## Contenido y orden (fijo)

| # | Bloque | Tipo | Notas |
|---|---|---|---|
| 1 | **Idioma** | `re-menu__section` + `re-segmented--block` (ES · EN) | Cambia en el acto; el menú sigue abierto |
| 2 | **Tema** | `re-menu__section` + `re-segmented--block` con iconos (`sun` · `moon` · `monitor`) | Claro, oscuro, sistema. `title`/`aria-label` en cada uno |
| 3 | Ajustes propios del producto | `re-menu__section` con `re-option` + switch | Máximo dos (ReRoute: «Avisos en la página»). Más ajustes → página de opciones |
| 4 | **Datos** | `re-menu__group`: Exportar (`download`) · Importar (`upload`) | Qué se exporta lo dice el texto: «Exportar reglas», «Exportar listas y protegidas» |
| 5 | **Ayuda** | `re-menu__group`: Ayuda y atajos (`circle-help`) | Abre la [página de ayuda](help-page.md) en una pestaña |

```
┌──────────────────────────────┐
│ IDIOMA                       │
│ [   ES   |   EN   ]          │
├──────────────────────────────┤
│ TEMA                         │
│ [  ☀  |  ☾  |  🖥  ]          │
├──────────────────────────────┤
│ (ajuste propio)        [══○] │
├──────────────────────────────┤
│ ⤓ Exportar …                 │
│ ⤒ Importar …                 │
├──────────────────────────────┤
│ ? Ayuda y atajos   Alt+⇧+H   │
└──────────────────────────────┘
```

## Reglas

- El engranaje es un `re-icon-btn` con `aria-haspopup="menu"` y `aria-expanded`.
- Importar abre la página de importación del producto (con vista previa), nunca importa directamente.
- Exportar descarga un archivo con el nombre del producto y la fecha (`resession-2026-10-17.json`).
- Nada destructivo («Restablecer todo») en este menú; si existe, va en la página de opciones con
  confirmación.
- El selector de idioma y tema usa `re-segmented`; no tiene un estilo propio.
