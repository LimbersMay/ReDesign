# ReBadge · ReKbd · ReDot

| Clase | Qué es | Fuente |
|---|---|---|
| `re-badge` | Dato técnico: método HTTP, formato (`{JWT}`), bandera (`H`, `S`), conteo | Mono, 700 |
| `re-badge--micro` | Bandera de una letra dentro de una fila densa | Mono, 600 |
| `re-pill` | Estado en palabras: «Lista blanca», «Pausada», «Expirada» | Sans, 600, redondeada |
| `re-kbd` / `re-kbd-combo` | Atajo de teclado | Mono, 600 |
| `re-dot` (`--live`, `--pulse`) | Estado vivo/inactivo sin texto | — |

Tonos (en `re-badge` y `re-pill`): neutro (por defecto), `--brand`, `--danger`, `--success`,
`--warning` (solo en `re-badge`).

```html
<span class="re-badge">GET</span>
<span class="re-badge re-badge--brand">{JWT}</span>
<span class="re-badge re-badge--micro" title="HttpOnly">H</span>
<span class="re-badge re-badge--danger">5</span>
<span class="re-pill re-pill--success"><ng-icon name="lucideShieldCheck" size="10" />{{ t('lists.whitelist') }}</span>
<span class="re-kbd-combo"><kbd class="re-kbd">Alt</kbd>+<kbd class="re-kbd">Shift</kbd>+<kbd class="re-kbd">S</kbd></span>
```

## Reglas

- Sin rellenos sólidos: fondo `-50`, borde `-200`, texto `-700` (o `-600` en rose).
- Los badges técnicos son siempre mono; las palabras de estado, `re-pill` en sans.
- Un conteo se pone en rojo solo si lo contado es peligroso (rastreadores), no para llamar la atención.
