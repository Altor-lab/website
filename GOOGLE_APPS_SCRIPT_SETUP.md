# Google Apps Script Setup for Email Form

## Current Implementation

The email form now uses **FormData** instead of JSON to avoid CORS preflight issues:

```javascript
const formData = new FormData()
formData.append('email', email)

await fetch('https://script.google.com/.../exec', {
  method: 'POST',
  body: formData,
})
```

**Why FormData works:**
- ✅ Sends as `multipart/form-data` (not `application/json`)
- ✅ Doesn't trigger CORS preflight request
- ✅ Works with Google Apps Script out of the box
- ✅ No CORS configuration needed

---

## Google Apps Script Code

You need to update your Google Apps Script to handle FormData POST requests:

### Google Apps Script Code (Apps Script Editor)

```javascript
function doPost(e) {
  try {
    // Get email from FormData
    const email = e.parameter.email;

    if (!email) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, message: 'Email is required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Validate email format (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, message: 'Invalid email format' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Save to Google Sheets (replace with your Sheet ID)
    const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Get this from your Sheet URL
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Append row with timestamp and email
    sheet.appendRow([
      new Date(),           // Column A: Timestamp
      email,                // Column B: Email
      'Website Form'        // Column C: Source
    ]);

    // Optional: Send confirmation email
    // MailApp.sendEmail({
    //   to: email,
    //   subject: 'Thank you for your interest in AltorLab',
    //   body: 'We will send your report shortly!'
    // });

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Email submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Failed to save email. Please try again.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### How to Get Your Google Sheet ID

1. **Create a new Google Sheet** or open an existing one
2. **Look at the URL** in your browser:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit
                                          ^^^^^^^^^^^^^^^^^^^^
                                          This is your Sheet ID
   ```
3. **Copy the Sheet ID** and replace `YOUR_GOOGLE_SHEET_ID_HERE` in the code above

### Deployment Settings

1. **Open your Google Apps Script project** (script.google.com)
2. **Paste the code above** into the editor
3. **Replace `YOUR_GOOGLE_SHEET_ID_HERE`** with your actual Sheet ID
4. **Click "Deploy" → "New deployment"**
5. **Click the gear icon** ⚙️ next to "Select type"
6. **Choose "Web app"**
7. **Configure settings:**
   - **Description:** "Email capture form" (optional)
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone** ⚠️ (This is important!)
8. **Click "Deploy"**
9. **Authorize the script** (click "Authorize access" and follow prompts)
10. **Copy the Web App URL** - it should look like:
    ```
    https://script.google.com/macros/s/AKfycbw.../exec
    ```

### Important Notes

- ✅ **"Who has access: Anyone"** is required for the form to work from your website
- ✅ The script runs as **you**, so it has permission to write to your Sheet
- ✅ FormData automatically works without CORS issues
- ✅ You can view execution logs in Apps Script under "Executions"

---

## Testing the Form

### 1. Test Locally First

```bash
cd react-app
npm run dev
```

Visit http://localhost:5173 and:
1. Enter a test email
2. Click "Get Report"
3. Check the browser console for any errors
4. Check your Google Sheet for the new row

### 2. Check Google Apps Script Logs

1. Open your Apps Script project
2. Click **"Executions"** in the left sidebar
3. You should see your script executions
4. Click on any execution to see details/errors

### 3. Verify Google Sheet

Your Google Sheet should have a new row with:
- **Column A:** Timestamp
- **Column B:** Email address
- **Column C:** "Website Form"

---

## Troubleshooting

### Issue: "Failed to submit" error

**Solution:**
- Make sure you deployed the script as **"Anyone"** can access
- Check that the Web App URL is correct
- Check Apps Script "Executions" tab for error details

### Issue: Email not appearing in Sheet

**Solution:**
- Verify the Sheet ID is correct
- Make sure the script has permission to access the Sheet
- Check Apps Script execution logs for errors

### Issue: Still getting CORS errors

**Solution:**
- Make sure you're using **FormData**, not JSON
- Don't include `Content-Type` header (let browser set it automatically)
- Verify the deployment is set to "Anyone" can access

---

## Summary

**Current Implementation:** ✅ FormData POST request (CORS-safe)

**What you need to do:**
1. ✅ Create a Google Sheet
2. ✅ Copy the Sheet ID from the URL
3. ✅ Paste the Google Apps Script code
4. ✅ Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your Sheet ID
5. ✅ Deploy as Web App with "Anyone" access
6. ✅ The form is already updated to use FormData

**Benefits:**
- ✅ No CORS issues
- ✅ Simple and reliable
- ✅ Can read server responses
- ✅ Easy to debug

**The React form is ready!** Just update your Google Apps Script and deploy it. 🎉

