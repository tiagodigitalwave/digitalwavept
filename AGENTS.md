# Architecture decisions

- Keep testimonial screenshots and award/certification images as project-served public files (public/testimonials, public/awards) rather than runtime asset pointers, because exported sites must display them outside Lovable's asset proxy.
- Site copy lives in src/lib/content.ts (PT and EN dictionaries) read through useI18n, so every text change must be made in both languages.
- Define the editorial system in global CSS tokens and reusable site classes, so visual changes remain consistent without altering copy or domain logic.
