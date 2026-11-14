document.addEventListener("DOMContentLoaded", () => {

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    const dot = document.createElement("div");
    const ring = document.createElement("div");

    dot.id = "custom-cursor-dot";
    ring.id = "custom-cursor-ring";

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    document.addEventListener("mousemove", (event) => {
        const x = event.clientX;
        const y = event.clientY;

        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;

        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
    });

    document.querySelectorAll("a, button, input, textarea").forEach(element => {
        element.addEventListener("mouseenter", () => {
            ring.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            ring.classList.remove("cursor-hover");
        });
    });

});