
(() => {

    const savedTheme = localStorage.getItem("dexo3-theme");
    const theme = savedTheme === "light" ? "light" : "dark";

    document.documentElement.dataset.theme = theme;

    document.addEventListener("DOMContentLoaded", () => {

        const button = document.getElementById("theme-toggle");

        if (!button) return;

        const updateButton = () => {
            button.textContent =
                document.documentElement.dataset.theme === "dark"
                ? "☼"
                : "☾";
        };

        updateButton();

        button.addEventListener("click", () => {

            const nextTheme =
                document.documentElement.dataset.theme === "dark"
                ? "light"
                : "dark";

            document.documentElement.dataset.theme = nextTheme;

            localStorage.setItem("dexo3-theme", nextTheme);

            updateButton();

        });

    });

})();
