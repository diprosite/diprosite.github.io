
/* =================================
   DEXO3 CONTACT API
   Version: 1.0.0
   Platform: Google Apps Script
================================= */

// YOUR EMAIL ADDRESS
const CONTACT_EMAIL = "https://script.google.com/home/projects/1DJao0t50QKV9w4iPaEzEYabIjaONv6rVUYRAMv4qbGMJvkLhOUzT2MVg/edit";

// API information
const API_NAME = "DEXO3 Contact API";
const API_VERSION = "1.0.0";

// GET REQUEST
function doGet() {
  return sendResponse({
    success: true,
    api: API_NAME,
    version: API_VERSION,
    status: "online",
    message: "DEXO3 Contact API is running."
  });
}

// POST REQUEST
function doPost(e) {
  try {

    // Check request data
    if (!e || !e.postData || !e.postData.contents) {
      return sendResponse({
        success: false,
        message: "No request data received."
      });
    }

    const data = JSON.parse(e.postData.contents);

    // Honeypot spam protection
    if (data.website) {
      return sendResponse({
        success: false,
        message: "Invalid submission."
      });
    }

    // Get form information
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const subject = String(data.subject || "").trim();
    const message = String(data.message || "").trim();

    // Validate information
    if (name.length < 2 || name.length > 80) {
      throw new Error("Please enter a valid name.");
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      throw new Error("Please enter a valid email.");
    }

    if (subject.length < 2 || subject.length > 100) {
      throw new Error("Invalid subject.");
    }

    if (message.length < 10 || message.length > 5000) {
      throw new Error("Message must be 10–5000 characters.");
    }

    // Send email
    MailApp.sendEmail({
      to: CONTACT_EMAIL,
      subject: "DEXO3 Contact: " + subject,
      replyTo: email,
      body:
        "NEW DEXO3 CONTACT MESSAGE\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Subject: " + subject + "\n\n" +
        "Message:\n" + message
    });

    return sendResponse({
      success: true,
      message: "Your message has been submitted successfully."
    });

  } catch (error) {

    return sendResponse({
      success: false,
      message: error.message || "Something went wrong."
    });

  }
}

// JSON RESPONSE
function sendResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
