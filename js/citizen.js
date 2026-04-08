/**
 * Citizen Dashboard JavaScript
 * Handles issue submission, fetching, and voting functionality
 */

// Check role-based access on page load
(function checkAccess() {
    if (!checkSession('CITIZEN')) {
        return;
    }
})();

// DOM Elements
const issueForm = document.getElementById('issueForm');
const issuesTableBody = document.getElementById('issuesTableBody');
const alertMessage = document.getElementById('alertMessage');
const loadingElement = document.getElementById('loading');

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchIssues();
    
    // Handle form submission
    issueForm.addEventListener('submit', handleIssueSubmit);
});

/**
 * Display alert message to the user
 * @param {string} message - Message to display
 * @param {string} type - Type of alert ('success' or 'error')
 */
function showAlert(message, type) {
    alertMessage.textContent = message;
    alertMessage.className = `alert alert-${type} show`;
    
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
        alertMessage.classList.remove('show');
    }, 5000);
}

/**
 * Show loading spinner
 */
function showLoading() {
    loadingElement.classList.add('show');
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    loadingElement.classList.remove('show');
}

/**
 * Handle issue form submission
 * POST /api/issues
 */
async function handleIssueSubmit(event) {
    event.preventDefault();

    const issueData = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        category: document.getElementById("category").value,
        location: document.getElementById("location").value.trim()
    };

    // Basic validation
    if (!issueData.title || !issueData.description || !issueData.category || !issueData.location) {
        showAlert("❌ Please fill all required fields", "error");
        return;
    }

    try {
        const response = await fetch(API_ENDPOINTS.CREATE_ISSUE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(issueData)
        });

        let data = {};
        try {
            data = await response.json();
        } catch (e) {}

        if (!response.ok) {
            throw new Error(data.message || `HTTP ${response.status}`);
        }

        showAlert("✅ Issue submitted successfully!", "success");

        issueForm.reset();
        fetchIssues();

    } catch (error) {
        console.error(error);
        showAlert(`❌ Error submitting issue: ${error.message}`, "error");
    }
}
/**
 * Fetch all issues from backend
 * GET /api/issues
 */
async function fetchIssues() {
    showLoading();
    
    try {
        const response = await fetch(API_ENDPOINTS.GET_ALL_ISSUES);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const issues = await response.json();
        
        // Display issues in table
        displayIssues(issues);
        
    } catch (error) {
        console.error('Error fetching issues:', error);
        issuesTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #dc3545;">
                    ⚠️ Failed to load issues. Please ensure the backend server is running on ${BASE_URL}
                </td>
            </tr>
        `;
    } finally {
        hideLoading();
    }
}

function getLocation() {
    if (!navigator.geolocation) {
        showAlert("❌ Geolocation is not supported by your browser", "error");
        return;
    }

    showAlert("📍 Fetching your location...", "success");

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // For now we store lat,long (simple and works)
            const locationText = `${latitude}, ${longitude}`;

            document.getElementById("location").value = locationText;

            showAlert("✅ Location detected successfully!", "success");
        },
        (error) => {
            console.error(error);
            showAlert("❌ Unable to retrieve location. अनुमति दें (Allow location access)", "error");
        }
    );
}

/**
 * Display issues in the table
 * @param {Array} issues - Array of issue objects
 */
function displayIssues(issues) {
    // Clear existing table content
    issuesTableBody.innerHTML = '';
    
    // Check if there are no issues
    if (!issues || issues.length === 0) {
        issuesTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #6c757d;">
                    No issues found. Be the first to report one!
                </td>
            </tr>
        `;
        return;
    }
    
    // Populate table with issues
    issues.forEach((issue, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${escapeHtml(issue.title)}</strong></td>
            <td>${escapeHtml(issue.description)}</td>
            <td>${issue.location || 'N/A'}</td>
            <td><span class="badge badge-${issue.category.toLowerCase()}">${issue.category}</span></td>
            <td><strong><span class="vote-count" id="vote-${issue.id}">👍 ${issue.voteCount || issue.votes || 0}</span></strong></td>
            <td>
                <button 
                    class="btn btn-success btn-small" 
                    onclick="voteIssue(${issue.id})"
                >
                    Vote
                </button>
            </td>
        `;
        
        issuesTableBody.appendChild(row);
    });
}

/**
 * Vote on an issue
 * PUT /api/issues/{id}/vote
 * @param {number} issueId - ID of the issue to vote on
 */
async function voteIssue(issueId) {
    try {
        const response = await fetch(API_ENDPOINTS.VOTE_ISSUE(issueId), {
            method: 'PUT'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Vote response:', data);
        
        // Get the updated vote count from response
        const voteCount = data.voteCount !== undefined ? data.voteCount : (data.votes || 0);
        
        // Show success message with updated vote count
        showAlert(`✅ Vote recorded! Total votes: ${voteCount}`, 'success');
        
        // Refresh issues list to show updated vote count
        fetchIssues();
        
    } catch (error) {
        console.error('Error voting on issue:', error);
        showAlert('❌ Failed to record vote. Please try again.', 'error');
    }
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


