# Architecture decisions

- Keep testimonial screenshots and award/certification images as project-served public files (public/testimonials, public/awards) rather than runtime asset pointers, because exported sites must display them outside Lovable's asset proxy.
