# ABROLE STUDIO — Cinematic Portfolio

A premium, dark-themed, animation-rich portfolio website for **ABROLE STUDIO by Abhi Yadav** — video editor, graphic designer and motion storyteller.

## What's inside

The site is a single, fast, dependency-light page built with clean semantic HTML, a hand-crafted CSS design system, and a lightweight JavaScript motion layer powered by GSAP + ScrollTrigger (loaded from CDN, with a graceful no-motion fallback if the CDN is ever unavailable).

```
index.html          — page structure and content
css/styles.css      — full design system (colors, type, layout, responsive, motion)
js/main.js          — motion engine, interactions, portfolio data, config
assets/             — logo, portrait, workspace and portfolio imagery, resume PDF
```

## Editing your details

Almost everything you will want to change lives in one place: the `CONFIG` object at the top of `js/main.js`. Open it and update the email address, phone number, WhatsApp link, Instagram and YouTube profile URLs, the resume file path, your YouTube showreel video ID, and an optional form endpoint. The showreel ID is the part of a YouTube URL after `watch?v=` — paste it into `showreelId` and the play button will stream your film inline.

Your portfolio pieces are defined in the `WORK` array just below the config. Each entry has a title, a category, a thumbnail image, a short description, a list of tags and an optional YouTube video ID. Give any entry a `video` ID and its card will show a play badge and open the video inside the project lightbox. The `size` field controls how wide each card is in the editorial grid: use `wide`, `half` or `sm`.

## Making the contact form live

By default the inquiry form opens the visitor's email app with the message pre-filled, so it works immediately with no setup. To receive submissions straight to your inbox, create a free form endpoint (Formspree or Getform both work well), then paste the endpoint URL into `formEndpoint` in `CONFIG`. The form will then POST directly and show an inline success message.

## Motion and accessibility

Entrance animations, scroll reveals, image parallax, the animated workflow timeline, count-up statistics, the magnetic buttons and the custom desktop cursor are all defined in `js/main.js` and `css/styles.css`. The site fully respects the `prefers-reduced-motion` setting, falls back to a standard cursor on touch devices, and keeps semantic HTML, keyboard focus and readable contrast throughout.

## Running locally

Serve the folder with any static server, for example `python3 -m http.server 8090` from inside the `site` directory, then open `http://localhost:8090`.

## Deploying

The folder is fully static. Upload it as-is to Netlify, Vercel, GitHub Pages, Cloudflare Pages or any web host — there is no build step.
