
window.DEXO3 = window.DEXO3 || {};

window.DEXO3.notify = function(message) {

    let notification = document.getElementById("dexo-notification");

    if (!notification) {

        notification = document.createElement("div");

        notification.id = "dexo-notification";

        Object.assign(notification.style, {
            position: "fixed",
            bottom: "25px",
            right: "25px",
            zIndex: "10000",
            padding: "14px 22px",
            background: "#10243c",
            color: "white",
            border: "1px solid #168cff",
            borderRadius: "10px"
        });

        document.body.appendChild(notification);

    }

    notification.textContent = String(message);

    notification.hidden = false;

    clearTimeout(window.DEXO3.notificationTimer);

    window.DEXO3.notificationTimer = setTimeout(() => {
        notification.hidden = true;
    }, 3000);

};
