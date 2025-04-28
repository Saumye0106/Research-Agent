document.addEventListener('DOMContentLoaded', function() {
    const researchForm = document.getElementById('researchForm');
    const statusElement = document.getElementById('status');
    const loaderElement = document.getElementById('loader');
    
    // The URL of your n8n webhook
    const webhookUrl = 'https://saumye.app.n8n.cloud/webhook/research'; // Replace with your actual webhook URL
    
    researchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const topicInput = document.getElementById('topic');
        const topic = topicInput.value.trim();
        
        if (!topic) {
            showStatus('Please enter a research topic', 'error');
            return;
        }
        
        // Show loading state
        showLoading(true);
        
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'Topic Of Research': topic
                })
            });
            
            if (response.ok) {
                const data = await response.json(); // Parse JSON response
                // Success: Show message with document URL
                showStatus(
                    'Your research is being generated! View your document:',
                    'success',
                    data.documentUrl // Pass the documentUrl from response
                );
                researchForm.reset();
            } else {
                // Server error
                const error = await response.text();
                throw new Error(error || 'Failed to submit research request');
            }
        } catch (error) {
            // Network or other error
            showStatus(`Error: ${error.message}`, 'error');
        } finally {
            showLoading(false);
        }
    });
    
    function showStatus(message, type, documentUrl = null) {
    // Clear previous content
    statusElement.innerHTML = '';

    // Create message element
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    statusElement.appendChild(messageElement);

    // If documentUrl is provided, add a clickable link
    if (documentUrl) {
        // Ensure documentUrl is a valid absolute URL
        let cleanUrl = documentUrl;
        if (cleanUrl.startsWith('=')) {
            cleanUrl = cleanUrl.substring(1); // Remove leading '=' if present
        }
        if (!cleanUrl.startsWith('http')) {
            cleanUrl = 'https://' + cleanUrl; // Ensure it starts with https://
        }

        const linkElement = document.createElement('a');
        linkElement.href = cleanUrl; // Use the cleaned URL
        linkElement.textContent = 'Open Document';
        linkElement.target = '_blank'; // Open in new tab
        linkElement.rel = 'noopener noreferrer'; // Security best practice
        linkElement.className = 'status-link'; // For styling
        statusElement.appendChild(linkElement);
    }

    // Set status classes and display
    statusElement.className = `status ${type}`;
    statusElement.style.display = 'block';

    // Auto-hide success messages after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 10000);
    }
}
    
    function showLoading(isLoading) {
        const submitBtn = researchForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        if (isLoading) {
            btnText.textContent = 'Processing...';
            loaderElement.style.display = 'block';
            submitBtn.disabled = true;
        } else {
            btnText.textContent = 'Generate Research';
            loaderElement.style.display = 'none';
            submitBtn.disabled = false;
        }
    }
});
