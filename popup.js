/* popup.js - Handles the popup UI and phishing detection logic */
document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkUrl');
    const resultDiv = document.getElementById('result');

    checkButton.addEventListener('click', function() {
        // Get the current tab's URL
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const url = tabs[0].url;
            checkPhishing(url, resultDiv);
        });
    });
});

// Simple phishing detection logic
function checkPhishing(url, resultDiv) {
    // Basic checks for phishing indicators
    const isHttps = url.startsWith('https://');
    const hasSuspiciousKeywords = /login|signin|bank|paypal|account/.test(url.toLowerCase());
    const hasOddDomain = !url.includes('.com') && !url.includes('.org') && !url.includes('.edu');

    if (!isHttps) {
        resultDiv.innerHTML = '<span style="color: red;">Warning: This site is not using HTTPS. Potential phishing risk!</span>';
    } else if (hasSuspiciousKeywords && hasOddDomain) {
        resultDiv.innerHTML = '<span style="color: orange;">Caution: Suspicious URL pattern detected.</span>';
    } else {
        resultDiv.innerHTML = '<span style="color: green;">This site appears safe.</span>';
    }

    // Optional: Add API call to PhishTank (requires API key)
    // fetch('https://checkurl.phishtank.com/checkurl/', { method: 'POST', body: url })
    //     .then(response => response.json())
    //     .then(data => { /* Process PhishTank response */ });
}
