# Build Light — Chinese Character Lab

Mobile-first interactive prototype for learning Chinese characters through visual construction and guided practice.

Live preview: https://crystal-102510.github.io/build-light/

## Current lesson

The current lesson is a complete eight-step learning loop for the water root: picture → seal script → `水` → `氵` → five related characters → useful word chunks → sentence meaning → sentence building → completion review. It includes retry hints, progress, practice scoring, restart, and mobile/desktop responsive layouts.

Lesson content lives in `assets/glyph-root-data.js`, separately from the renderer, so later roots can reuse the same course structure.

This repository contains the deployable static build used by GitHub Pages.
