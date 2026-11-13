
DEXO3 CONTACT SYSTEM
====================

PURPOSE
-------
Receives contact form submissions and sends them to
the DEXO3 support email using Google Apps Script.

REQUIREMENTS
------------
1. A Google account.
2. An email address you control.
3. Google Apps Script access.
4. A deployed Google Apps Script Web App.

SETUP
-----

STEP 1:
Open:
https://script.google.com/

STEP 2:
Create a new project named:
DEXO3 Contact System

STEP 3:
Paste the contents of Code.gs into the Apps Script editor.

STEP 4:
Replace:
YOUR_EMAIL@gmail.com

with your actual receiving email address.

STEP 5:
Click Deploy > New deployment.

STEP 6:
Choose Web app.

Execute as:
Me

Who has access:
Anyone, if available and appropriate.

STEP 7:
Authorize the requested permissions.

STEP 8:
Copy the deployed Web App URL ending in /exec.

STEP 9:
Open:
js/contact.js

Replace:
PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE

with the deployed URL.

STEP 10:
Test the form using your local website.

IMPORTANT
---------
- Do not publish private passwords.
- Do not put email passwords in HTML or JavaScript.
- Protect the Apps Script project.
- The current no-cors frontend cannot confirm email delivery.
- Google Apps Script quotas and access restrictions apply.
- Keep the privacy policy updated.
- Do not promise delivery until it has been verified.
