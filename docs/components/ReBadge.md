# ReBadge · ReKbd · ReDot

| Clase | Qué es | Fuente |
|---|---|---|
| `re-badge` | Dato técnico: método HTTP, formato (`{JWT}`), bandera (`HttpOnly`, `Secure`), conteo | Mono, 700 |
| `re-badge--micro` | Bandera de una letra dentro de una fila densa | Mono, 600 |
| `re-pill` | Estado en palabras: «Lista blanca», «Pausada», «Expirada» | Sans, 600, redondeada |
| `re-kbd` / `re-kbd-combo` | Atajo de teclado | Mono, 600 |
| `re-dot` (`--live`, `--pulse`) | Estado vivo/inactivo sin texto | — |

Tamaño de `re-pill`: 22px por defecto; `re-pill--sm` (18px) para cabeceras y zonas densas.

Tonos (en `re-badge` y `re-pill`): neutro (por defecto), `--brand`, `--danger`, `--success`,
`--warning` (solo en `re-badge`).

```html
<span class="re-badge">GET</span>
<span class="re-badge re-badge--brand">{JWT}</span>
<span class="re-badge">HttpOnly</span>
<span class="re-badge re-badge--micro">H</span>
<span class="re-badge re-badge--danger">5</span>
<span class="re-pill re-pill--success"><ng-icon name="lucideShieldCheck" size="10" />{{ t('lists.whitelist') }}</span>
<span class="re-kbd-combo"><kbd class="re-kbd">Alt</kbd>+<kbd class="re-kbd">Shift</kbd>+<kbd class="re-kbd">S</kbd></span>
```

## Reglas

- Sin rellenos sólidos: fondo `-50`, borde `-200`, texto `-700` (o `-600` en rose).
- Una bandera lleva su nombre completo; la letra suelta (`--micro`) solo vale donde el nombre se
  explica en otro sitio de la misma pantalla.
- Los badges técnicos son siempre mono; las palabras de estado, `re-pill` en sans.
- Un conteo se tiñe solo si lo contado es una señal de rol (`--danger` para errores); nunca para llamar la
  atención. El de los rastreadores es neutro.
