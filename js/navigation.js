
document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-links");

    if (!menuButton || !nav) return;

    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        });
    });

});
