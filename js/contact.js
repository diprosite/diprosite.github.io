
const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const formNotice = document.getElementById("formNotice");

const API_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (API_URL.includes("PASTE_YOUR")) {
        formNotice.textContent =
            "Contact system is not configured yet.";
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const data = Object.fromEntries(new FormData(contactForm));

    try {
        await fetch(API_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data)
        });

        // no-cors cannot confirm whether Google accepted the request.
        formNotice.textContent =
            "Your submission was sent. Delivery confirmation is not available here. Please contact us by email if you need confirmation.";

        contactForm.reset();

    } catch (error) {
        formNotice.textContent =
            "Unable to submit your message. Please try again.";
    }

    submitButton.disabled = false;
    submitButton.textContent = "Send Message →";
});
