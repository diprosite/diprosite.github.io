
document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("search-toggle");
    const panel = document.getElementById("search-panel");
    const input = document.getElementById("site-search");
    const results = document.getElementById("search-results");

    if (!toggle || !panel || !input || !results) return;

    const pages = [
        { name: "Home", url: "index.html" },
        { name: "About", url: "about.html" },
        { name: "Contact", url: "contact.html" },
        { name: "Services", url: "services.html" },
        { name: "Coding Studio", url: "coding-studio/index.html" },
        { name: "Calculator Hub", url: "calculator-hub/index.html" }
    ];

    toggle.addEventListener("click", () => {
        panel.classList.toggle("open");

        if (panel.classList.contains("open")) {
            input.focus();
        }
    });

    input.addEventListener("input", () => {

        const query = input.value.trim().toLowerCase();

        results.replaceChildren();

        if (!query) return;

        const matches = pages.filter(page =>
            page.name.toLowerCase().includes(query)
        );

        matches.forEach(page => {

            const link = document.createElement("a");
            link.href = page.url;
            link.textContent = page.name;

            results.appendChild(link);

        });

        if (matches.length === 0) {
            const message = document.createElement("p");
            message.textContent = "No matching pages found.";
            results.appendChild(message);
        }

    });

});
