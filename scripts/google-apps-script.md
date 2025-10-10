# Google Apps Script webhook for Google Sheets

This file explains how to deploy a Google Apps Script that receives form submissions and writes them into the Google Sheet.

1) Create a new Apps Script project
- Open https://script.google.com
- Click New project

2) Replace the default code with the following (update the SHEET_ID and SECRET):

```javascript
const SHEET_ID = '1mCWS1rp6D79F42cnP732XGu5h2kKcOZgzQvpvmITeWs';
const SECRET = 'REPLACE_WITH_SECRET'; // must match APPS_SCRIPT_SECRET on your server

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');

    // Validate secret
    if (payload.__serverSecret !== SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid secret' })).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0];

    const source = payload.source || '';
    const submittedAt = payload.submittedAt || new Date().toISOString();
    const data = payload.data || payload.contact || {};
    const items = JSON.stringify(payload.items || []);
    const total = payload.totalUsd || '';

    // Append a row. Adjust columns as you like.
    sheet.appendRow([
      submittedAt,
      source,
      data.nombre || data.name || '',
      data.email || '',
      data.telefono || data.phone || '',
      data.pais || '',
      data.servicio || '',
      data.mensaje || data.message || '',
      items,
      total
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3) Deploy
- Click `Deploy > New deployment`
- Select `Web app`
- Set `Execute as`: Me
- Set `Who has access`: Anyone
- Deploy and copy the Web App URL

Note: the provided script will auto-insert a header row (submittedAt, source, nombre, email, telefono, pais, servicio, mensaje, items, total) if the sheet is empty.

4) Configure server
- On your server (or `.env.local`) set:

```
GOOGLE_SHEETS_WEBHOOK=https://script.google.com/macros/s/XXX/exec
APPS_SCRIPT_SECRET=some-long-secret-string
```

Make sure `APPS_SCRIPT_SECRET` here matches `SECRET` inside the Apps Script.

5) Test
- Submit the contact form on your site. Check the sheet for a new row.

6) Troubleshooting and final checks
- If the sheet remains empty: run `testAppend()` from the Apps Script editor to authorize and confirm write access.
- After making code changes in the editor, re-deploy (Manage deployments -> Update) so the public URL points to the latest code.
- If you rotate the secret, update both `.env.local` and the `SECRET` constant in the Apps Script, then redeploy.

Notes
- This approach uses a shared secret to validate origin. It's simple but effective if you keep the secret safe.
- Consider adding CAPTCHA or rate-limiting if you expect spam.
- For higher security, restrict the Apps Script access to only your domain using OAuth and published APIs; that requires more advanced setup.
