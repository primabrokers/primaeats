# USR Sound & Lighting — website redesign

A new site for [USR Sound & Lighting](https://www.usrsoundandlighting.com), the event sound, lighting and staging hire company in Prestwich, Manchester. It's a standalone app in this folder and doesn't share code with the rest of the repo.

- **Home**: a live 3D lighting rig. Five moving heads hang from a truss over a starlit dance floor, with the USR gobo projected on it. The beams follow the visitor's pointer. As you scroll through Sound, Lighting and Staging, the rig changes look.
- **Hire catalogue** (`/hire`): 16 products that you can filter by category, search and sort, plus a "collect it yourself" toggle.
- **Product pages** (`/hire/:slug`): a 3D model you can rotate and zoom. Lights can be set to a colour, and the model updates as you pick one. Each page has prices for a day, a weekend and a week, what's included, specs, related kit and add to booking.
- **Packages** (`/packages`): Wedding, Party, Live and Conference bundles, with links to the kit in each.
- **Booking / order form** (`/booking`): lets you change the kit list, pick a hire length, enter event and venue details, choose delivery or set-up, and enter contact details. It shows a live estimate, validates as you go and lists every error at the top. It ends on a confirmation page with a reference number.
- **Contact** and **About** pages. Contact accepts `?about=<package>` to pre-fill the message.

## Stack

React 19 + Vite + TypeScript, Three.js via React Three Fiber and drei, GSAP ScrollTrigger, Framer Motion and Zustand. It follows the *web3d-integration-patterns* layered architecture:

- GSAP owns scroll and writes to a small store (`src/store/stage.ts`).
- The R3F scene only reads from the store. Fixtures are driven through mutable controller objects, so nothing re-renders on each frame.
- React and Motion handle the UI layer.

The 3D code sits in lazy-loaded chunks. Without WebGL the page falls back to a static image or a CSS gradient. The render loop pauses once the hero scrolls off screen, and reduced-motion settings are respected.

```
src/
  brand.ts              name, logo path, contact details, company info
  styles/tokens.css     brand colours, type, spacing (3D reads colours from here too)
  data/catalogue.ts     products, packages, prices, hire lengths, delivery options
  store/booking.ts      booking basket (saved in localStorage) and totals
  three/                HeroStage, ProductViewer, fixture parts, product models, shaders
  pages/                one file per route
scripts/render-thumbnails.mjs   renders each 3D model to public/renders/<slug>.png
```

## Run it

```bash
cd usr-sound-lighting
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Before launch: things to swap in

1. **Logo.** The site uses the real USR logo. `public/brand/usr-logo.png` is cut out of the 200 px original (`usr-logo-original.jpg`), and the favicons are made from it too. It looks sharp at header size, but a larger PNG or a vector file (SVG, PDF or AI) would look better on high-resolution screens. Drop it in at the same path, or point `brand.logo.src` in `src/brand.ts` at it and update the width and height.
2. **Brand colours.** They're taken from the logo and live in `src/styles/tokens.css`: purple `#7B2FC4` and white on charcoal. A lighter purple (`--brand-light`) is used for focus rings, underlines and text on dark, so they meet contrast guidelines. Blue, purple, magenta and white code the four kit categories. The 3D scenes read the same values, so the beams follow any change.
3. **Contact details.** `src/brand.ts` has the email (not yet verified), an empty phone number (a blank phone is hidden everywhere) and the Instagram handle.
4. **Products and prices.** `src/data/catalogue.ts` is realistic **sample** content. Replace it with the real inventory and rates. To use real photos, set `image` on a product. Otherwise regenerate the 3D renders:
   ```bash
   npx playwright install chromium   # once
   npm run renders                   # or: npm run renders -- club-pa
   ```
5. **Where form submissions go.** Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` to a Formspree or Basin endpoint (or your own). Booking requests and enquiries are then POSTed there as JSON. Without it, submitting opens the visitor's email app with the whole request written out, addressed to `brand.email`.
6. **Copy.** Read through the About page and the product descriptions and correct anything that doesn't match how USR works.

## Deploy

It's a static single-page app. On Vercel, set the project's root directory to `usr-sound-lighting`; `vercel.json` already sends every route to `index.html`. On Netlify, `public/_redirects` does the same job.
