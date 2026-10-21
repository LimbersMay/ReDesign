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
- Una bandera lleva su nombre completo; la letra suelta (`--micro`, o `re-flag` en una fila densa) solo
  vale donde el nombre se explica en otro sitio de la misma pantalla o en su tooltip (`re-tip`).
- Los badges técnicos son siempre mono; las palabras de estado, `re-pill` en sans.
- Un conteo se tiñe solo si lo contado es una señal de rol (`--danger` para errores); nunca para llamar la
  atención. El de los rastreadores es neutro.

## Tooltip

`re-tip` en el elemento y `re-tip__bubble` dentro: un tooltip con formato (admite `<strong>`) que aparece
encima, centrado, al pasar el ratón **o con el foco de teclado**, tras 250 ms. `re-tip--end` lo alinea al
borde derecho del elemento, para lo que está cerca del borde derecho de la ventana. Una pista simple sigue
usando `title`.

```html
<span class="re-flag re-tip re-tip--end" aria-label="HttpOnly">H
  <span class="re-tip__bubble" aria-hidden="true"><strong>HttpOnly</strong> · los scripts de la página no la leen</span>
</span>
```

- La burbuja es `aria-hidden`: lo que dice para un lector de pantalla va en el `aria-label` del elemento.
- Una línea. Si hace falta un párrafo, es ayuda, no un tooltip.
