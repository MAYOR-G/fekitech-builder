# Template Implementation Guide

Read this file before adding, registering, redesigning, importing, or modifying any template in FekiTech Builder.

The builder contains many independently styled templates. A change made for one template must never alter another template's colours, typography, layout, animations, preview image, editor behaviour, or published output.

## Core Rule

Every template must be isolated.

Template-specific colours, fonts, buttons, section styles, animations, image rules, layout fixes, and fallback styles belong inside that template's own folder and must be scoped to that template. Do not put template design rules in global files.

Use a unique wrapper or selector for each template, normally:

```tsx
<main data-template-id="template-id" className="template-id">
  ...
</main>
```

Then scope CSS under that wrapper:

```css
[data-template-id="template-id"] {
  --template-bg: #ffffff;
  --template-text: #161616;
  --template-accent: #b45a2a;
}

[data-template-id="template-id"] .hero {
  background: var(--template-bg);
  color: var(--template-text);
}
```

Never rely on unscoped selectors such as `body`, `main`, `section`, `button`, `a`, `h1`, `p`, `img`, `*`, or `:root` for template styling unless the selector is inside the template's root scope.

## What Went Wrong Before

We previously saw a regression where work on one template affected many others:

- Dark templates became light.
- Original green/orange accents became blue.
- Text lost contrast or became invisible.
- Some typography shrank or changed.
- Template-specific colours leaked into unrelated previews.

This can happen when:

- A template adds broad CSS to `globals.css`.
- Shared CSS variables are changed globally.
- A palette or typography fallback is applied to every template.
- Runtime theme data from one template is reused by another template.
- Template CSS uses broad selectors without a unique root scope.
- Imported third-party/template CSS is not namespaced.
- Preview/editor styles leak into published template rendering.
- The catalogue image or registry entry is changed for templates outside the intended target set.

## Folder Structure

Each real template should live in:

```text
src/templates/template-id/
  config.json
  editable.json
  template.tsx
  TemplateContext.tsx        optional, if the template uses local context
  index.css or styles.css    template-scoped only
  components/
  assets/                    optional source-side assets
```

Public assets should live in:

```text
public/templates/template-id/
public/templates/assets/
public/templates/template-id.webp
```

Use `public/templates/template-id/...` for assets that belong to one template. Use `public/templates/assets/...` only for shared or deliberately reusable assets.

## Safe Template Addition Steps

1. Create the template folder under `src/templates/template-id`.
2. Add `config.json` with a stable `id`, user-facing `name`, `category`, and `image`.
3. Add `editable.json` with the template's original content and original theme values.
4. Build `template.tsx` so it accepts `data` and renders from merged editable data.
5. Wrap the full template in a unique root selector:

```tsx
<div data-template-id="template-id" className="template-id">
  ...
</div>
```

6. Put all template CSS inside the template folder.
7. Scope every CSS rule under `[data-template-id="template-id"]` or `.template-id`.
8. Import template CSS only from that template's `template.tsx` or local entry file.
9. Add public images and icons using stable project paths.
10. Generate one catalogue preview image after the template renders correctly.
11. Register the template only after it is complete and validated.

## Registration Checklist

Register templates in `src/registry/index.ts` only when all of these are true:

- The folder has `config.json`, `editable.json`, and a working `template.tsx`.
- The template renders in `/preview/template-id?frame=1`.
- The template has a catalogue preview image.
- The template does not import CSS from another unrelated template.
- The template does not require unfinished assets or missing remote files.
- The template is included in `src/lib/plans.ts` if plan gating requires it.
- `tests/registry.test.ts` passes.

Do not register unfinished template folders just so they appear in the catalogue. Keep unfinished templates unregistered until they are ready.

## CSS Rules

Allowed:

```css
[data-template-id="luma-slice-pizza"] .hero-title {
  color: var(--luma-heading);
}

[data-template-id="luma-slice-pizza"] button {
  border-radius: 999px;
}
```

Avoid:

```css
button {
  border-radius: 999px;
}

h1 {
  color: blue;
}

:root {
  --accent: blue;
}

body {
  background: white;
}
```

Never use broad `!important` rules globally. If a converted template needs `!important`, keep it inside that template's root selector and explain why in a short comment.

## Global CSS Boundary

Global files such as `src/app/globals.css` should contain only builder-wide foundations:

- Resets
- Accessibility defaults
- App shell variables
- Utility classes used by the builder itself
- Editor shell styling

Global files must not contain:

- Template-specific palettes
- Template-specific font stacks
- Template-specific button styles
- Template-specific section backgrounds
- Template-specific animation keyframes with generic names
- Fixes for one imported template
- Broad selectors that change rendered templates

If a global change seems necessary, first ask: "Will this alter an existing template preview or published website?" If the answer might be yes, do not make it global.

## Theme And Palette Safety

Every template needs its own original theme tokens. A project with no selected palette must render the template's original design.

Store original template colours in the template's own data or theme defaults, not as one universal app fallback.

Recommended semantic tokens:

```json
{
  "theme": {
    "palette": "original",
    "colors": {
      "page": "#ffffff",
      "section": "#f7f2eb",
      "surface": "#ffffff",
      "card": "#ffffff",
      "heading": "#161616",
      "body": "#333333",
      "muted": "#6f6f6f",
      "accent": "#b45a2a",
      "accentSecondary": "#e0b36a",
      "buttonPrimary": "#161616",
      "buttonPrimaryText": "#ffffff",
      "buttonSecondary": "transparent",
      "buttonSecondaryText": "#161616",
      "buttonSecondaryBorder": "#161616",
      "link": "#b45a2a",
      "icon": "#b45a2a",
      "border": "#ded8cf",
      "headerBg": "#ffffff",
      "headerText": "#161616",
      "footerBg": "#161616",
      "footerText": "#ffffff"
    }
  }
}
```

When adding palette support:

- "Original" must restore the active template's own original colours.
- Selecting a palette must affect only the active project.
- Do not persist palette values into default template data unless intentionally changing that template's original design.
- Do not share palette object references between templates.
- Do not make a universal fallback palette that overrides all templates.

## Typography Safety

Each template should define original typography defaults. A font-pair selection should be project-specific.

Do not set global heading/body fonts for all templates from one template change.

Template CSS should use template variables:

```css
[data-template-id="template-id"] {
  --template-heading-font: "Playfair Display", serif;
  --template-body-font: "Inter", sans-serif;
}

[data-template-id="template-id"] h1,
[data-template-id="template-id"] h2 {
  font-family: var(--template-heading-font);
}
```

## Editable Data Rules

Visible customer-facing content should come from `editable.json` or structured template data:

- Header and navigation text
- Hero headings and descriptions
- Buttons and CTA labels
- Services, products, menu items, prices
- About sections
- Testimonials
- Statistics
- Contact details
- Addresses and hours
- Form labels
- Footer content
- Image alt text
- Link destinations

Use stable field paths. Do not rename existing saved project paths without a compatibility migration.

Good:

```json
{
  "hero": {
    "title": "Fresh savoury snacks.",
    "subtitle": "Proper pies, sausage rolls, Scotch eggs and party boxes.",
    "primaryCta": {
      "label": "Order boxes",
      "href": "#order"
    }
  }
}
```

Avoid hardcoded customer-facing text in JSX unless it is truly decorative or not intended to be edited.

## Imported Or Converted Templates

Some templates come from exact HTML/CSS exports. These are high-risk because they often contain broad CSS, hidden wrappers, preloaders, animation code, and global selectors.

For converted templates:

- Keep all imported CSS inside the template folder.
- Render the export inside a unique wrapper or iframe if needed.
- Remove or disable preloaders that hide content forever.
- Rewrite asset paths to local public assets.
- Avoid remote image dependencies unless they are stable and licensed.
- Scope fallback fixes to that template only.
- Do not copy export CSS into `globals.css`.
- Do not let export CSS define app-level `:root`, `body`, `button`, or `a` rules outside its runtime boundary.

If the export uses an iframe, make sure catalogue screenshots and editor previews capture the actual template content, not the parent shell.

## Images And Assets

Use images that match the business type. Do not reuse unrelated or placeholder images.

Rules:

- Use local `public/templates/...` assets when possible.
- Do not depend on temporary external URLs.
- Do not use images from another template unless intentionally shared.
- Do not repeat one hero image throughout the whole website unless the design specifically calls for it.
- Use descriptive `alt` text for meaningful images.
- Keep decorative images marked appropriately.
- Check for 404s in the browser console.

## Catalogue Preview Rules

Catalogue screenshots must show only the template website.

Do not include:

- FekiTech preview toolbar
- Editor controls
- Builder navigation
- "Use this template" UI
- Browser chrome

When refreshing previews:

1. Confirm the exact registered templates being processed.
2. Do not modify previews outside the requested range.
3. Use `/preview/template-id?frame=1` or an equivalent isolated render.
4. Wait for fonts, images, lazy loading, and reveal animations.
5. Trigger scroll animations where needed.
6. Use one screenshot per template unless a carousel is explicitly requested.
7. Use consistent viewport and dimensions.
8. Confirm the config points to a deployable, non-ignored public path.

## Registry Order And Pagination

The catalogue currently paginates templates in registry order. Page size is 27.

When adding or removing templates:

- Read `src/registry/index.ts` in its current order first.
- Do not reorder existing templates unless specifically asked.
- Do not change the first 27 previews when asked to work on templates after position 27.
- Keep deleted templates removed from the registry, plan list, tests, and public catalogue assets.
- Do not register unfinished folders.

## Preview, Editor, And Published Output

Template output must be clean in all render modes:

- Catalogue card
- Full preview
- Visual editor canvas
- Saved project reload
- Published subdomain

Editor controls must never appear in preview or published sites.

Palette, typography, and content edits must be project-specific. Switching templates or opening another project must not carry over the previous template's styling.

## Validation Checklist

Before finishing a template change, validate:

- `npm test -- --run tests/registry.test.ts`
- `npm run typecheck`
- Preview route loads: `/preview/template-id?frame=1`
- Catalogue card image loads with no 404.
- No console errors caused by missing assets.
- The template keeps its original colours when no palette is selected.
- "Original" palette restores that template, not a universal default.
- Existing dark/light templates still look correct.
- No unrelated template config, CSS, or preview image changed.

For larger template work, also run:

```bash
npm run lint
npm run build
```

## Final Self-Check Before Committing

Run these checks:

```bash
git diff --stat
git diff -- src/app/globals.css
git diff -- src/registry/index.ts
git status --short
```

Ask yourself:

- Did I touch only the requested template files?
- Did I avoid global CSS for template-specific styling?
- Did I keep every selector scoped?
- Did I preserve existing saved project compatibility?
- Did I avoid registering unfinished templates?
- Did I avoid changing payment or plan logic unless explicitly requested?
- Did I leave the first 27 catalogue previews untouched if the task was only for later templates?

If any answer is uncertain, stop and inspect before continuing.

## What Not To Do

Do not:

- Put template colours in `globals.css`.
- Add broad `button`, `a`, `h1`, `section`, `img`, `body`, `main`, `*`, or `:root` styling for a single template.
- Replace all templates with one shared default palette.
- Persist a selected palette into default template data.
- Let one template import another template's CSS by accident.
- Register unfinished template folders.
- Regenerate catalogue images outside the requested templates.
- Modify payments, subscriptions, or entitlement logic while doing template work.
- Delete templates without an explicit user request.
- Rewrite old saved project data without a migration or normalisation path.

## Safe Pattern Summary

The safe pattern is:

1. Build the template inside its own folder.
2. Wrap it with a unique template root.
3. Scope every style under that root.
4. Keep original theme and typography inside the template.
5. Register only when complete.
6. Generate one clean preview image.
7. Validate the template and nearby registry behaviour.
8. Confirm unrelated templates did not change.

