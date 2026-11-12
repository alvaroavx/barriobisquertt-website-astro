# Design system — Barrio Bisquertt

Captured from the project's own styles. Every value below exists in the sources named
next to it; nothing here is invented. If a source changes, re-run the sync.

## Fonts

`src/styles/fonts.css`, `src/styles/tokens.css`

| Token | Family | Weights declared | Source |
| --- | --- | --- | --- |
| `--font-sans` | Acidgrotesk | 200, 300, 400, 500 italic, 700 | `src/styles/tokens.css`, `src/styles/fonts.css` |
| `--font-serif` | Timesnow | 200, 300, 600, 700 (normal + italic) | `src/styles/tokens.css`, `src/styles/fonts.css` |

Fallbacks declared in the token: `Arial, sans-serif` and `Georgia, serif`.

Artboards cannot load project fonts (no external or file URLs allowed), so they map:

| Design family | Artboard stack |
| --- | --- |
| Acidgrotesk | `'Helvetica Neue', Helvetica, Arial, sans-serif` |
| Timesnow | `Georgia, 'Times New Roman', serif` |

Weights used in the current pages: 300 for headings and card titles, 400 for body,
700 for eyebrow and small emphasis.

## Colors

`src/styles/tokens.css` (values are the project's own).

| Token | Value | Usage |
| --- | --- | --- |
| `--color-page` | `#f7f4f5` | Page background |
| `--color-page-alt` | `#f5f2f3` | Media placeholders, image backgrounds |
| `--color-surface` | `#ffffff` | Card and control surfaces |
| `--color-text` | `#171717` | Primary text |
| `--color-text-webflow` | `#333333` | Body copy inside hero/detail |
| `--color-muted` | `#999999` | Meta, eyebrow, secondary labels |
| `--color-nav-active` | `#b7bcd8` | Active/hover nav pill |
| `--color-footer` | `#945e4c` | Footer background |
| `--color-footer-button` | `#c18b79` | Footer submit button |
| `--color-card-tint` | `#dab5cf` | Tinted feature card |
| `--color-border` | `#dddddd` | Control borders |
| `--color-accent-orange` | `#dd783f` | Accent |
| `--color-accent-orange-hover` | `#f17228` | Accent hover |
| `--color-accent-green` | `#5cc489` | Accent |
| `--color-slate` | `#243039` | Dark accent |

Derived, non-token alphas used by the current CSS (kept as-is, they are the measured
values in `src/styles/layout.css`): header background `rgb(247 244 245 / 92%)`,
header border `rgb(23 23 23 / 8%)`, card border `rgb(23 23 23 / 7%)`, card hover
shadow `rgb(23 23 23 / 10%)`, lightbox backdrop `rgb(0 0 0 / 88%)`.

## Typography scale

`src/styles/layout.css`, `src/styles/global.css`

| Role | Rule | Source |
| --- | --- | --- |
| Page title (`h1`) | `clamp(3rem, 8vw, 7rem)`, weight 300, line-height 0.95, max-width 980px | `.page-hero h1` |
| Mobile page title | `2.75rem` below 479px | `@media (max-width: 479px)` |
| Section heading | `25px / 44px`, weight 300 | `.home-section__header h2` |
| Card title | `22px`, weight 300, line-height 1.05 | `.content-card h2` |
| Tinted feature card title | `1rem`, line-height 1.3 | `.featured-grid` last child |
| Detail/section serif heading | `clamp(2rem, 4vw, 4rem)`, weight 300 | `.gallery-section h2` |
| Eyebrow | `0.875rem`, weight 700, uppercase, `--color-muted` | `.eyebrow` |
| Hero paragraph | `1.1rem`, line-height 1.55 | `.page-hero p` |
| Card meta | `0.82rem`, `--color-muted` | `.content-card__meta` |
| Article body | `1.1rem`, line-height 1.72 | `.article-content` |
| Card description clamp | 3 lines via `-webkit-line-clamp` | `.content-card__body > p:last-child` |

## Spacing

`src/styles/layout.css`

| Token / rule | Value | Usage |
| --- | --- | --- |
| Container | `min(100% - 48px, 1500px)` | `.container` |
| Home container | `1475px` | `--container-home` |
| Article container | `950px` | `--container-article` |
| Business container | `810px` | `--container-business` |
| Header width | `min(100% - 48px, 1180px)` | `.site-header` |
| Mobile container | `min(100% - 28px, …)` | `@media (max-width: 767px)` |
| Grid gap | `28px` | `.card-grid` |
| Mobile grid gap | `18px` | `@media (max-width: 767px)` |
| Hero padding | `96px 0 44px` | `.page-hero` |
| Grid bottom padding | `72px` | `.card-grid` |
| Card body padding | `20px` / `16px` at 479px | `.content-card__body` |
| Card body gap | `10px` | `.content-card__body` |
| Section separation | `80px` | `.home-section` |

## Radius

`src/styles/tokens.css`

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | `3px` | Gallery thumbnails |
| `--radius-md` | `12px` | Cards, media frames |
| `--radius-lg` | `20px` | Large panels |
| `--radius-xl` | `24px` | Mobile nav panel |
| `--radius-pill` | `999px` | Header, nav links, form fields |

## Shadows and depth

| Rule | Value | Source |
| --- | --- | --- |
| Card hover | `transform: translateY(-3px)` + `0 18px 36px rgb(23 23 23 / 10%)` | `.content-card:hover` |
| Header | 1px border + `backdrop-filter: blur(12px)` | `.site-header` |
| Card border | `1px solid rgb(23 23 23 / 7%)` | `.content-card` |

## Breakpoints

`src/styles/tokens.css`, `src/styles/layout.css`

`479px` (tiny), `767px` (small), `991px` (medium), `992px` (main).
Grid behavior: 3 columns → 2 at 991px → 1 at 767px. Gallery: 4 → 3 → 2.

## Component rules

| Component | Rules | Source |
| --- | --- | --- |
| Site header | Sticky `top: 16px`, pill, `92%` page background, blur, 1px border, `10px 14px` padding, logo 121px | `.site-header` |
| Nav link | Pill, min-height 40px, `0 18px` padding, hover/active `--color-nav-active` | `.site-nav__link` |
| Mobile nav | `display: none` until 767px; open panel is a `24px` radius card below the header | `.site-nav`, `.menu-toggle` |
| Eyebrow | Uppercase 700 `0.875rem` muted, `12px` bottom margin | `.eyebrow` |
| Content card | White surface, 1px hairline border, `--radius-md`, 4:3 media, 3-line clamped description, hover lift | `.content-card` |
| Tinted feature card | `--color-card-tint` background, no border | `.featured-grid` |
| Detail action chip | Pill, white, `1px --color-border`, `10px 14px` | `.detail-actions a` |
| Primary form field | Pill, 48px min-height, `inherit` font, no border | `.footer-form input` |
| Footer | `--color-footer`, white text, two-column, 64px padding | `.site-footer` |
| Focus | `:focus-visible` outline `3px solid var(--color-text)`, offset `4px` | `src/styles/global.css` |
| Motion | 180–200ms ease transitions; no keyframe animation in the current CSS | `.content-card` |

## Gaps this sync does not fill

The current site has no search field, no filter control, no alphabet index, and no
empty state for the directory listing. Any new control proposed in a design must
borrow the token values above and reuse the pill, hairline-border and muted-meta
language instead of introducing a new one.
