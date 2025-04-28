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
                // Success
                showStatus('Your research is being generated! You will receive the document when it\'s ready.', 'success');
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
    
    function showStatus(message, type) {
        statusElement.textContent = message;
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

function checkStatus(jobId) {
    const statusCheckInterval = setInterval(async () => {
        try {
            const response = await fetch(`YOUR_STATUS_ENDPOINT?id=${jobId}`);
            const data = await response.json();
            
            if (data.status === 'complete') {
                showStatus(`Research complete! Download your document: <a href="${data.downloadUrl}">Click here</a>`, 'success');
                clearInterval(statusCheckInterval);
            } else if (data.status === 'error') {
                showStatus('An error occurred during research generation', 'error');
                clearInterval(statusCheckInterval);
            } else {
                showStatus(`Research in progress: ${data.progress}% complete`, 'processing');
            }
        } catch (error) {
            console.error('Error checking status:', error);
        }
    }, 5000); // Check every 5 seconds
}

document.addEventListener('DOMContentLoaded', function() {
    const researchForm = document.getElementById('researchForm');
    const statusElement = document.getElementById('status');
    const loaderElement = document.getElementById('loader');
    
    // The URL of your n8n webhook
    const webhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE';
    
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
        showStatus('Your research is being generated. This might take a few minutes...', 'processing');
        
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
                // Get the response data which should include the document URL
                const data = await response.json();
                
                if (data.documentUrl) {
                    // Success with document URL
                    showStatus(`
                        <p>Your research is complete!</p>
                        <p><a href="${data.documentUrl}" target="_blank" class="doc-link">
                            View your research document
                        </a></p>
                    `, 'success', true);
                } else {
                    // Success but no document URL
                    showStatus('Your research has been generated successfully!', 'success');
                }
                
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
    
    function showStatus(message, type, isHTML = false) {
        if (isHTML) {
            statusElement.innerHTML = message;
        } else {
            statusElement.textContent = message;
        }
        
        statusElement.className = `status ${type}`;
        statusElement.style.display = 'block';
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
