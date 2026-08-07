# Premium UK Template Batch Design

## Objective

Add exactly ten new, isolated, responsive and editable UK business templates without deleting, redesigning or reordering existing templates.

## Approved batch

1. `hawthorne-fields-academy` — independent school
2. `the-rowan-house` — boutique hotel
3. `mercer-blythe-solicitors` — legal practice
4. `north-ledger-accountants` — chartered accountants
5. `wren-vow-events` — wedding and events studio
6. `kindred-paws-vets` — veterinary practice
7. `field-stem-florist` — florist
8. `little-lanterns-nursery` — nursery and childcare
9. `borough-motor-works` — garage, servicing and MOT
10. `wildmere-gardens` — landscape design studio

## Architecture

Each template owns `config.json`, `editable.json`, `template.tsx`, `styles.css`, and public assets under `public/templates/<id>/assets`. Every rendered template has a unique `data-template-id` root, with all CSS scoped beneath it. Customer-facing text, navigation, links, images, alternative text, contact details, brand name, logo, social links, theme colours and relevant icons come from editable data and expose the existing editor DOM bindings.

Templates use client-side internal page navigation consistent with the strongest current multi-page templates. Each provides at least five substantial pages, a mobile menu, complete header/footer, UI-level form handling, reduced-motion support and visible fallback content.

## Shared changes

The registry, plan entitlement list and registry tests will be appended only after each template passes its completion gate. The existing 59 curated palettes are sufficient and will remain unchanged. The icon library may receive small additive categories needed by the new industries; existing icon names and categories remain compatible. No global template styling is planned.

## Asset strategy

Use locally stored, optimised WebP assets with descriptive alternative text. Visual references inform composition only; business names, copy, brand systems and layouts are original. Generated or appropriately licensed imagery will be stored inside each template's public asset folder.

## Testing

For each template: registry test, typecheck, preview route, asset checks, console inspection, editor path checks and responsive screenshots. At the end: lint, typecheck, full tests, production build, catalogue validation, editor persistence checks and regression sampling of existing templates.

## Baseline

Before implementation on 6 August 2026: lint passed, typecheck passed, 17/17 tests passed, production build passed with two pre-existing warnings (multiple lockfiles/output tracing root and deprecated middleware convention). The `ember-grace-church` isolated preview returned HTTP 200 on `localhost`.

