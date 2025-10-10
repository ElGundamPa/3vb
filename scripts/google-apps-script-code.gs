const SHEET_ID = '1mCWS1rp6D79F42cnP732XGu5h2kKcOZgzQvpvmITeWs';
// Read secret from Script Properties (recommended). Set APPS_SCRIPT_SECRET in the Apps Script editor
// under Project Settings -> Script properties. This avoids hardcoding secrets in the repository.
let SECRET = '';
try {
  // PropertiesService is available in the Apps Script runtime
  SECRET = PropertiesService.getScriptProperties().getProperty('APPS_SCRIPT_SECRET') || '';
} catch (e) {
  // Editing locally or running tests: SECRET will be empty. Use a deploy-time property in Apps Script.
  SECRET = '';
}

/**
 * Respond to GET so you can sanity-check the web app URL in a browser.
 */
function doGet(e) {
  const out = { ok: true, message: 'Apps Script webhook is up' };
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Main entry for POST requests from the server.
 * Expects JSON body and a server-side secret in __serverSecret.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return _jsonError('No postData provided');
    }

    Logger.log('doPost raw: %s', e.postData.contents);
    const payload = JSON.parse(e.postData.contents || '{}');

    // Validate secret
    if (!payload.__serverSecret || payload.__serverSecret !== SECRET) {
      Logger.log('Invalid secret: %s', payload.__serverSecret);
      return _jsonError('Invalid secret');
    }

    // Use a script lock to prevent concurrent appendRow collisions
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID);
      const sheet = ss.getSheets()[0];

        // If the sheet looks empty (no header in A1), insert header row
        const firstCell = sheet.getRange(1, 1).getValue();
        if (!firstCell) {
          const headers = ['submittedAt', 'source', 'nombre', 'email', 'telefono', 'pais', 'servicio', 'mensaje', 'items', 'total'];
          sheet.appendRow(headers);
          Logger.log('Headers inserted: %s', JSON.stringify(headers));
        }

      const source = payload.source || '';
      const submittedAt = payload.submittedAt || new Date().toISOString();
      const data = payload.data || payload.contact || {};
      const items = JSON.stringify(payload.items || []);
      const total = payload.totalUsd || '';

      // Compose the row — adjust columns as you like
      const row = [submittedAt, source, data.nombre || data.name || '', data.email || '', data.telefono || data.phone || '', data.pais || '', data.servicio || '', data.mensaje || data.message || '', items, total];
      Logger.log('Appending row: %s', JSON.stringify(row));
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log('doPost error: %s', String(err));
    return _jsonError(String(err));
  }
}

function _jsonError(msg) {
  return ContentService.createTextOutput(JSON.stringify({ error: msg })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper to test appendRow from the editor (will prompt for authorizations).
 */
function testAppend() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheets()[0];
  sheet.appendRow(['TEST_FROM_EDITOR', new Date().toISOString()]);
  Logger.log('testAppend done');
}
