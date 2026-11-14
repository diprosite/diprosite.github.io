/* DIPROSITE Cursor Wave Animation */

document.addEventListener("DOMContentLoaded", () => {

    if (
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let lastWave = 0;

    document.addEventListener("mousemove", (event) => {

        const now = performance.now();

        // Control wave frequency
        if (now - lastWave < 65) return;

        lastWave = now;

        const wave = document.createElement("span");

        wave.className = "cursor-wave";

        wave.style.left = event.clientX + "px";
        wave.style.top = event.clientY + "px";

        document.body.appendChild(wave);

        wave.addEventListener("animationend", () => {
            wave.remove();
        }, { once: true });

    });

});