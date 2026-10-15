# RISE Profile for Growth Mindset Application

A responsive web application based on the RISE framework (*Response to Setbacks, Input & Feedback, Stretch Through Challenge, Experimentation & Change*), featuring a mobile-first participant reflection assessment, password-protected facilitator dashboard, instant QR code generator, live collective results & maturity distribution, Google Sheets sync integration, and printable PDF group reports.

---

## 🌟 Key Features

1. **Mobile-First Participant Assessment:**
   - Designed for smartphones and desktops alike with high touch targets, progress tracking, and randomized question/option ordering.
   - Immediate personal reflection report with 4-pillar scoring percentage, maturity levels (*Growth strength, Generally adaptive, Context dependent, Protective under pressure*), key tendencies, and personalized self-coaching prompts.
   - Individual 1-click **Print / Save PDF**.
   - Cohort/Session assignment (e.g. `Leadership-Oct-2026`).

2. **Facilitator Dashboard (Password-Protected):**
   - Access via the **Facilitator** button at the top right.
   - Default master password: `rise2026` (can be changed anytime directly in the Dashboard settings).
   - **Collective Workshop Analytics**: View overall mean score, peak strength pillar, and top growth area across the entire cohort.
   - **Maturity Level Distribution**: Breakdown of participant counts across the 4 reflection tiers.
   - **Facilitator Debrief Guide**: Actionable talking points and reflection prompts generated based on the cohort's weakest pillar.
   - **Participant Roster**: Filterable and searchable table with individual dimension scores, overall averages, and timestamps.
   - **Export to CSV**: 1-click data export for further analysis in Excel or reporting tools.

3. **QR Code Generator:**
   - Instant QR code generated for the current session/cohort.
   - Display on presentation slides or projectors so participants can scan directly from their mobile camera and land right into the assessment with the workshop cohort pre-filled.

4. **Printable Executive Group Report:**
   - Click **Print Group Report** inside the Facilitator Dashboard.
   - Opens a print-optimized executive summary suitable for PDF export or A4 color physical handouts, including executive summary KPIs, dimension comparative charts, debrief guidance, and full participant matrix.

5. **Google Sheets Sync:**
   - Webhook connection directly to your own Google Sheet.
   - Participant submissions automatically create rows in real-time.
   - Offline fallback buffer if internet connection drops during workshops.

---

## 🚀 Quick Start / How to Run

1. Open `index.html` directly in any modern browser (Chrome, Edge, Safari, Firefox).
2. Or serve locally with any static server:
   ```bash
   # Python 3
   python -m http.server 8080
   ```
   Then navigate to `http://localhost:8080`.

---

## 📊 Google Sheets Integration Guide (2 Minutes)

To have participant responses automatically populate your Google Sheet:

1. Open [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. In the top menu, go to **Extensions** > **Apps Script**.
3. Copy the code from `google_apps_script.js` (or click "Copy Apps Script Code" in the Facilitator Dashboard) and replace all existing text in the editor.
4. Click **Deploy** > **New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial so participants can submit without Google login)*
7. Click **Deploy** (Authorize access when prompted).
8. Copy the **Web app URL** and paste it into **Facilitator Dashboard** > **Google Sheets & Settings** > **Save Endpoint**.
9. Click **Send Test Ping** to verify!

---

## 🔒 Security & Reset
- Default password: `rise2026`
- All records are saved locally on the facilitator's device (`localStorage`) and pushed to Google Sheets if configured.
- Facilitators can click **Load 12 Sample Responses** in settings to test out the collective analytics and group report immediately.
