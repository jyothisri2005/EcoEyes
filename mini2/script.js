// Function to close the form
function closeForm(formId) {
    document.getElementById(formId).classList.add('hidden');
}

// Show user login form when the button is clicked
document.getElementById('user-login-btn').addEventListener('click', function() {
    document.getElementById('user-form').classList.remove('hidden');
    document.getElementById('admin-form').classList.add('hidden');
});

// Show admin login form when the button is clicked
document.getElementById('admin-login-btn').addEventListener('click', function() {
    document.getElementById('admin-form').classList.remove('hidden');
    document.getElementById('user-form').classList.add('hidden');
});