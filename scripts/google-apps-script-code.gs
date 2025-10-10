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

      // Detect currency
      let currency = 'UNKNOWN';
      if (payload.currency) currency = String(payload.currency).toUpperCase();
      else if (typeof payload.totalUsd !== 'undefined') currency = 'USD';
      else if (typeof payload.totalMxn !== 'undefined') currency = 'MXN';
      else if (typeof payload.totalPen !== 'undefined' || typeof payload.totalPEN !== 'undefined') currency = 'PEN';

      const itemsArr = Array.isArray(payload.items) ? payload.items : (payload.cart || []);

      // Ensure header with per-item columns
      const firstCell = sheet.getRange(1, 1).getValue();
      if (!firstCell) {
        const headers = ['submittedAt', 'source', 'service', 'lawyer', 'quantity', 'currency', 'contactName', 'contactEmail', 'contactPhone', 'country', 'message'];
        sheet.appendRow(headers);
        Logger.log('Headers inserted: %s', JSON.stringify(headers));
      }

      const contactName = data.nombre || data.name || '';
      const contactEmail = data.email || '';
      const contactPhone = data.telefono || data.phone || '';
      const country = data.pais || data.country || '';
      const message = data.mensaje || data.message || '';

      // Append one row per item
      itemsArr.forEach(item => {
        const serviceRaw = item.serviceId || item.servicio || item.service || '';
        const lawyerRaw = item.lawyerId || item.lawyer || item.abogado || '';
        const quantity = item.quantity || item.cantidad || item.qty || 1;

        const serviceLabel = String(serviceRaw).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const lawyerLabel = String(lawyerRaw).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        const row = [submittedAt, source, serviceLabel, lawyerLabel, quantity, currency, contactName, contactEmail, contactPhone, country, message];
        Logger.log('Appending item row: %s', JSON.stringify(row));
        sheet.appendRow(row);
      });
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
