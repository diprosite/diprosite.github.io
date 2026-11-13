
document.addEventListener("DOMContentLoaded", () => {

    // Current year
    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Page loader
    const loader = document.getElementById("page-loader");

    if (loader) {
        const hideLoader = () => loader.classList.add("loaded");

        if (document.readyState === "complete") {
            hideLoader();
        } else {
            window.addEventListener("load", hideLoader, { once: true });
        }

        // Fallback in case a resource loads slowly
        window.setTimeout(hideLoader, 4000);
    }

});
