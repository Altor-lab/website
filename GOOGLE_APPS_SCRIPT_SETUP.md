# Google Apps Script CORS Setup

## Issue

The email form is getting CORS errors when trying to POST to the Google Apps Script endpoint:
```
CORS Missing Allow Origin
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource
```

## Current Workaround

I've updated the form to use a **GET request with `no-cors` mode** as a temporary workaround:

```javascript
const url = `https://script.google.com/macros/s/.../exec?email=${encodeURIComponent(email)}`

await fetch(url, {
  method: 'GET',
  mode: 'no-cors',
})
```

**Limitations:**
- We can't read the response from the server
- We assume success if no error is thrown
- The form will show success message even if the server-side fails

---

## Proper Solution: Fix Google Apps Script

You need to update your Google Apps Script to properly handle CORS. Here's the correct code:

### Google Apps Script Code (Apps Script Editor)

```javascript
function doGet(e) {
  // Get email from query parameter
  const email = e.parameter.email;
  
  if (!email) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Email is required' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    // Your logic here - e.g., save to Google Sheets
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
    sheet.appendRow([new Date(), email]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Email submitted successfully!' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Failed to save email' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  // Parse JSON body
  const data = JSON.parse(e.postData.contents);
  const email = data.email;
  
  if (!email) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Email is required' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    // Your logic here - e.g., save to Google Sheets
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
    sheet.appendRow([new Date(), email]);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Email submitted successfully!' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Failed to save email' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Deployment Settings

1. **Open your Google Apps Script project**
2. **Click "Deploy" → "New deployment"**
3. **Settings:**
   - Type: Web app
   - Execute as: **Me** (your account)
   - Who has access: **Anyone** (important for CORS)
4. **Click "Deploy"**
5. **Copy the new Web App URL**

---

## Better Solution: Use JSONP or Form Submission

### Option 1: Use a Hidden Form (No CORS Issues)

This is the most reliable method for Google Apps Script:

```jsx
const handleEmailSubmit = (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  
  // Create a hidden iframe
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.name = 'hidden_iframe'
  document.body.appendChild(iframe)
  
  // Create a form
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'https://script.google.com/macros/s/.../exec'
  form.target = 'hidden_iframe'
  
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'email'
  input.value = email
  
  form.appendChild(input)
  document.body.appendChild(form)
  form.submit()
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(form)
    document.body.removeChild(iframe)
    setSubmitStatus('success')
    setSubmitMessage('Thank you! Your report will be sent shortly.')
    setEmail('')
    setIsSubmitting(false)
  }, 1000)
}
```

### Option 2: Use Google Forms

The easiest solution is to use Google Forms:

1. **Create a Google Form** with an email field
2. **Get the form's pre-filled link:**
   - Click the three dots → "Get pre-filled link"
   - Fill in a test email
   - Copy the URL
3. **Extract the form ID and entry ID** from the URL
4. **Submit directly to Google Forms** (no CORS issues)

Example:
```javascript
const FORM_URL = 'https://docs.google.com/forms/d/e/FORM_ID/formResponse'
const EMAIL_ENTRY_ID = 'entry.123456789' // From pre-filled link

const formData = new FormData()
formData.append(EMAIL_ENTRY_ID, email)

fetch(FORM_URL, {
  method: 'POST',
  body: formData,
  mode: 'no-cors',
})
```

---

## Recommended Approach

**For Production:** Use **Option 1 (Hidden Form)** or **Option 2 (Google Forms)**

Both methods:
- ✅ No CORS issues
- ✅ Work reliably with Google Apps Script
- ✅ Don't require server-side changes
- ✅ Simple to implement

**Current Implementation:** Uses GET with `no-cors` mode (works but can't read response)

---

## Update the React Component (Better Version)

If you want to use the hidden form approach, here's the updated code:

```jsx
const handleEmailSubmit = (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setSubmitMessage('')
  setSubmitStatus('')

  try {
    // Create hidden iframe
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.name = 'hidden_iframe'
    document.body.appendChild(iframe)

    // Create form
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://script.google.com/macros/s/AKfycbwwlOM3AQKOTrsYM4b68RsbU7H-9uWlgT9cAh5Xg5l_8D4q9iT8ocia7oMLCfIe8vhv/exec'
    form.target = 'hidden_iframe'

    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = 'email'
    input.value = email

    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()

    // Clean up and show success
    setTimeout(() => {
      document.body.removeChild(form)
      document.body.removeChild(iframe)
      setSubmitStatus('success')
      setSubmitMessage('Thank you! Your report will be sent shortly.')
      setEmail('')
      setIsSubmitting(false)
    }, 1000)
  } catch (error) {
    setSubmitStatus('error')
    setSubmitMessage('Failed to submit. Please try again.')
    setIsSubmitting(false)
  }
}
```

---

## Testing

1. **Current implementation (GET with no-cors):**
   - Should work without errors
   - Shows success message
   - Check Google Apps Script logs to verify email was received

2. **To verify it's working:**
   - Open Google Apps Script
   - Go to "Executions" tab
   - Check if your script is being triggered
   - Check your Google Sheet (if you're saving to Sheets)

---

## Summary

**Current Status:** ✅ Form works with GET request + no-cors mode

**Limitations:** Can't read server response

**Recommended Next Steps:**
1. Update Google Apps Script to handle GET requests (see code above)
2. OR switch to hidden form submission method
3. OR use Google Forms directly

**For now:** The current implementation will work - emails will be submitted, but we can't show custom success/error messages from the server.

