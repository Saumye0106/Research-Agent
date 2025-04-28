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
