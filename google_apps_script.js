/**
 * Google Apps Script for RISE Profile App
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Rename the Sheet to "RISE Profile Responses"
 * 3. In the top menu, go to: Extensions > Apps Script
 * 4. Replace any existing code in Code.gs with this entire file
 * 5. Click "Save" (disk icon)
 * 6. Click "Deploy" > "New deployment"
 * 7. Click the gear icon next to "Select type" and choose "Web app"
 * 8. Set Description: "RISE Webhook"
 * 9. Set "Execute as": "Me"
 * 10. Set "Who has access": "Anyone"  <-- CRITICAL for the web app to submit
 * 11. Click "Deploy" (Grant permissions if prompted)
 * 12. Copy the "Web app URL" and paste it into the Facilitator Dashboard Settings!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Participant Name",
        "Cohort / Session",
        "Response to Setbacks (R %)",
        "Input & Feedback (I %)",
        "Stretch Through Challenge (S %)",
        "Experimentation & Change (E %)",
        "Strongest Dimension",
        "Growth Opportunity",
        "Raw Scores JSON"
      ]);
      // Format headers
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#f7e8ed").setFontColor("#8f1232");
      sheet.setFrozenRows(1);
    }

    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append submission row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "Anonymous",
      data.cohort || "General",
      data.pctR || (data.percentages ? data.percentages.R : 0),
      data.pctI || (data.percentages ? data.percentages.I : 0),
      data.pctS || (data.percentages ? data.percentages.S : 0),
      data.pctE || (data.percentages ? data.percentages.E : 0),
      data.strongest || "",
      data.opportunity || "",
      JSON.stringify(data.answers || {})
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", result: "Saved to Google Sheet" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  // Test ping endpoint to verify connection
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "RISE Profile Google Apps Script endpoint is online and responding."
  })).setMimeType(ContentService.MimeType.JSON);
}
