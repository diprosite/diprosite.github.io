
document.addEventListener("DOMContentLoaded", () => {

    // Close navigation with Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            const nav = document.getElementById("nav-links");
            const menu = document.getElementById("menu-toggle");
            const search = document.getElementById("search-panel");

            nav?.classList.remove("open");
            menu?.setAttribute("aria-expanded", "false");

            if (menu) menu.textContent = "☰";

            search?.classList.remove("open");

        }

    });

});
