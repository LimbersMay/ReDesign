# ReToc

Índice lateral de una **página completa** (ayuda, opciones): «En esta página», una entrada por sección y,
con sangría bajo ella, las tarjetas que lista. Lleva a cada parte con un clic y marca dónde estás. Nace de
la Ayuda de ReSession y de ReRoute, que lo repetían con utilidades sueltas.

```html
<nav class="hidden lg:block" [attr.aria-label]="t('help.nav.title')">
  <div class="re-toc sticky top-10 max-h-[calc(100cqh-5rem)]">
    <p class="re-section-title">{{ t('help.nav.title') }}</p>

    @for (section of sections; track section.id) {
      @let open = openSection() === section.id;
      <button
        type="button"
        class="re-toc__link"
        [attr.aria-current]="activeId() === section.id ? 'location' : null"
        [attr.aria-expanded]="section.children.length ? open : null"
        [attr.aria-controls]="section.children.length ? section.id + '-nav' : null"
        (click)="chooseSection(section)"
      >
        <span class="re-toc__label">{{ t(section.labelKey) }}</span>
        @if (section.children.length) {
          <ng-icon name="lucideChevronRight" size="14" class="re-toc__chevron" />
        }
      </button>

      @if (section.children.length && open) {
        <div class="re-toc__group" [id]="section.id + '-nav'">
          @for (entry of section.children; track entry.id) {
            <button
              type="button"
              class="re-toc__link"
              [attr.aria-current]="activeId() === entry.id ? 'location' : null"
              (click)="scrollTo(entry.id)"
            >
              @if (entry.code) {
                <span class="re-toc__code">{{ entry.code }}</span>
              }
              {{ t(entry.labelKey) }}
            </button>
          }
        </div>
      }
    }
  </div>
</nav>
```

## Partes

| Clase | Qué es |
|---|---|
| `re-toc` | La columna de entradas. Se desplaza sola, con barra fina, si no cabe |
| `re-section-title` | «En esta página», alineado con el texto de las entradas |
| `re-toc__link` | Una entrada: `<button>` (con enrutado por hash) o `<a href="#id">`. La actual lleva `aria-current` |
| `re-toc__label` | El nombre de una sección que lleva flecha: ocupa el ancho y empuja la flecha al final |
| `re-toc__chevron` | La flecha de una sección plegable, **dentro** de su entrada. Gira con `aria-expanded="true"` |
| `re-toc__group` | Las tarjetas de una sección, con sangría y una línea a la izquierda |
| `re-toc__code` | Un código antes del nombre (E04), en mono gris |

## Reglas

- **Solo en páginas completas.** En el popup no hay sitio: allí se navega con [ReSegmented](ReSegmented.md)
  o [ReList](ReList.md). En pantallas estrechas el índice se oculta (`hidden lg:block`) y la página queda
  en una columna.
- **Un solo nivel de sangría**: secciones y, debajo, sus tarjetas. Lo que no sea una tarjeta que la gente
  viene a buscar (una acción, un caso de error) se queda fuera del índice.
- **La entrada actual**, una a la vez, con `aria-current="location"`: la última elegida en el índice o la
  que abrió un enlace (`?problem=E04`). La tarjeta de destino lleva [`re-card.is-active`](ReCard.md) y
  recibe el foco, para que Tab siga desde allí.
- **Plegar** cuando las tarjetas harían el índice más alto que la pantalla. Las secciones con tarjetas
  empiezan plegadas y la flecha va dentro de la entrada:
  - el primer clic lleva a la sección y la despliega; el segundo, con la sección abierta, la pliega sin
    desplazar la página;
  - una sola abierta a la vez: ir a otra parte pliega la anterior;
  - la sección de la entrada actual está abierta (un enlace a E04 abre «Solución de problemas»).
- **Posición y alto son de la página**: `sticky` con su `top` y un `max-height` que deje ver la última
  entrada. Si el que se desplaza es un contenedor y no la ventana, `[container-type:size]` en él y
  `max-h-[calc(100cqh-5rem)]` en el índice.
- **El código, antes del nombre** y el nombre como nodo de texto detrás (no en otro `<span>`), para que el
  lector de pantalla y las pruebas lean «E04 Conexión rechazada» con su espacio.
- **Sin color de marca**: la entrada actual se marca con el gris del hover, como la opción activa de un
  segmented (R13). El foco visible es el de la suite.
