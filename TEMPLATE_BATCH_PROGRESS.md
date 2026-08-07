# Template Batch Progress

Last updated: 6 August 2026

## Baseline

- Repository state before edits: clean.
- Lint: passed.
- Typecheck: passed.
- Tests: 17/17 passed.
- Production build: passed.
- Pre-existing warnings: inferred workspace root due to multiple lockfiles; deprecated Next.js middleware convention.
- Existing templates are protected from deletion, redesign and registry reordering.
- Existing editor contains 59 curated palettes; no palette additions are presently necessary.

## Batch tracker

All statuses below use the requested completion vocabulary. “Complete” means source, registration, editable data, local assets, preview asset and automated validation are present.

| # | Template | Category | Distinct composition | Pages | Status | Preview | Issues |
|---|---|---|---|---|---|---|---|
| 1 | Hawthorne Fields Academy (`hawthorne-fields-academy`) | Independent school | Dark prospectus grid, vertical founding rail, layered editorial photography | Home, About, Admissions, Learning, School Life, Visit | Complete | `public/templates/hawthorne-fields-academy.webp` | None |
| 2 | The Rowan House (`the-rowan-house`) | Boutique hotel | Full-bleed stay photography with floating townhouse booking panel | Home, Rooms, Dining, Experiences, Our Story, Book | Complete | `public/templates/the-rowan-house-tall.png` | None |
| 3 | Mercer & Blythe (`mercer-blythe-solicitors`) | Legal practice | Case-notes grid, monogram rail and restrained parchment composition | Home, Expertise, People, Insights, About, Enquire | Complete | `public/templates/mercer-blythe-solicitors.webp` | None |
| 4 | North Ledger (`north-ledger-accountants`) | Accountancy | Cobalt ledger matrix, metric panel and square data cards | Home, Services, Sectors, Team, Insights, Contact | Complete | `public/templates/north-ledger-accountants.webp` | None |
| 5 | Wren & Vow (`wren-vow-events`) | Wedding and events | Centred romantic editorial with rotated print-style photography | Home, Services, Selected Work, Process, About, Enquire | Complete | `public/templates/wren-vow-events-tall.png` | None |
| 6 | Kindred Paws (`kindred-paws-vets`) | Veterinary practice | Bright clinical orbit, circular pet imagery and soft service modules | Home, Services, Our Team, Pet Advice, About, Book | Complete | `public/templates/kindred-paws-vets.webp` | None |
| 7 | Field & Stem (`field-stem-florist`) | Florist | Vertical botanical wordmark, asymmetric studio images and masonry gallery | Home, Flowers, Weddings, Workshops, Journal, Visit | Complete | `public/templates/field-stem-florist-tall.png` | None |
| 8 | Little Lanterns (`little-lanterns-nursery`) | Nursery and childcare | Yellow play field, ABC sculpture, rounded learning photography | Home, Rooms, Our Approach, For Parents, Team, Visit | Complete | `public/templates/little-lanterns-nursery.webp` | None |
| 9 | Borough Motor Works (`borough-motor-works`) | Garage, servicing and MOT | Graphite inspection board, angled workshop image and lime service blocks | Home, Services, MOT, Repairs, About, Book | Complete | `public/templates/borough-motor-works.webp` | None |
| 10 | Wildmere Gardens (`wildmere-gardens`) | Landscape design | Immersive landscape cover, translucent project caption and garden mosaic | Home, Projects, Services, Process, Studio, Enquire | Complete | `public/templates/wildmere-gardens-tall.png` | None |
| 11 | Halcyon Table (`tallow-and-sage`) | Premium restaurant | Seasonal editorial plate, vertical date rail and floating tasting-menu note | Home, Menu, The Kitchen, Private Dining, Journal, Reservations | Complete | `public/templates/tallow-and-sage-tall.png` | None |
| 12 | The Nightjar & Crown (`nightjar-and-crown`) | Modern British pub | Dark pub sign, arched room photography, cask/kitchen/music ticker | Home, Drinks, Kitchen, What's On, Our House, Book | Complete | `public/templates/nightjar-and-crown-tall.png` | None |
| 13 | Crumb & Char (`crumb-and-char`) | Burger restaurant | Yellow poster system, circular burger composition and stamped pricing | Home, Menu, How We Smash, Offers, Shops, Order | Complete | `public/templates/crumb-and-char-tall.png` | None |
| 14 | Luma Slice Pizza (`forno-sixteen`) | Artisan pizza restaurant | Vertical FORNO masthead, circular pizza feature and 48-hour dough badge | Home, Menu, Our Dough, Delivery, Locations, Order | Complete | `public/templates/forno-sixteen-tall.png` | None |

## Research references and selected patterns

- School: Webflow Eduvolv and Academic — admissions clarity, programme structure and staff trust; final design uses an original British prospectus composition rather than their card systems.
- Hotel: Framer LUNU, Lodr and Montvera — editorial pacing, persistent booking action and room storytelling; final design uses a townhouse-inspired vertical room index.
- Legal: Squarespace law-firm gallery — practice areas, qualifications and enquiry confidence; final design avoids generic corporate-blue cards in favour of a restrained case-notes layout.
- Accountancy: Wix accounting gallery — clear services, insights and expertise; final design uses a distinctive ledger/grid visual language.
- Wedding/events: Framer Wedlux, Madre Mia and Amore — portfolio, process, packages and testimonials; final design uses an original British-seasonal editorial treatment.
- Veterinary: Webflow Vet X, Pawfect and veterinary gallery — appointments, services, team and advice; final design uses calm clinical clarity with friendly pet-led imagery.
- Florist: Wix flower-shop gallery and florist examples — collections, workshops and weddings; final design resembles a contemporary botanical field notebook.
- Nursery: Wix preschool template — programmes, staff and philosophy; final design uses accessible modular colour fields rather than pastel decoration alone.
- Garage: Webflow BootLab — services, pricing/certification and booking; final design uses an MOT inspection-board hierarchy with large service numerals.
- Landscape: Framer Langard, Garden and Terra Care — project photography, service areas and quote flow; final design uses a quiet garden-journal layout with seasonal annotations.
- Food: Wix restaurant and bar collections, Yola restaurant templates, Framer E&O/Cuisine and the Framer restaurant marketplace — menu clarity, strong food imagery, reservation/order journeys and responsive hierarchy. The four finished food templates deliberately use different visual grammars: fine-dining editorial, pub signage, burger poster and pizza workshop.

## Shared-file change log

- `src/templates/_uk-batch/BatchTemplate.tsx`: additive renderer and editor bindings used only by this new batch; contains fourteen separate hero DOM structures.
- `src/templates/_uk-batch/base.css`: batch-only responsive/accessibility foundations; every visible identity is overridden and scoped in its template stylesheet.
- `src/registry/index.ts`: fourteen entries appended; existing order preserved.
- `src/lib/plans.ts`: fourteen additive Business-plan mappings.
- `tests/registry.test.ts`: expected registry and preview lists appended.
- `tests/new-template-batch.test.ts`: validates registration, preview presence, page depth, local assets, editability and style isolation.

## Final validation

- Lint: passed.
- Typecheck: passed.
- Tests: 22/22 passed across four test files, including editor save/reload persistence for logo, business name and colour changes plus undo/redo.
- Production build: passed.
- Browser validation completed before the environment quota was exhausted: internal page navigation, mobile menus, console errors and widths 320, 375, 430, 768, 1024, 1280 and 1440 were checked for the first browser batch; no horizontal overflow was found in completed measurements.
- Exact limitation: the desktop approval quota blocked relaunching Playwright/Puppeteer for the final second-pass capture of five templates. No code or build failure caused this. Static validation, local asset validation, typecheck, tests and production build all pass. The safe next action is to rerun `node scripts/validate-new-template-batch.cjs` when desktop browser approval becomes available.
