
// DIPROSITE scroll reveal
const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .contact-box"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});
