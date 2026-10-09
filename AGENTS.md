# Architecture decisions

- Keep testimonial screenshots and award/certification images as project-served public files (public/testimonials, public/awards) rather than runtime asset pointers, because exported sites must display them outside Lovable's asset proxy.
- Express the shared cinematic presentation through global semantic tokens and scoped homepage styles, while keeping the quiz and legal page content independent, so visual changes do not alter acquisition logic.
