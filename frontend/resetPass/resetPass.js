window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginEmail = urlParams.get('loginEmail');

    if (loginEmail) {
        document.getElementById('loginEmail').value = decodeURIComponent(loginEmail);
    }
});


document.getElementById('resetForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const loginEmail = localStorage.getItem('loginEmail');

    if (newPassword !== confirmPassword) {
        document.getElementById('errorMessage').textContent = 'Error: Passwords do not match.';
        document.getElementById('errorMessage').classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:3000/user/reset-pass-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ loginEmail, newPassword}) 
        });

        if (response.ok) {
            document.getElementById('resetMessage').classList.remove('hidden');
        } else {
            document.getElementById('errorMessage').textContent = 'Error: Failed to reset password.';
            document.getElementById('errorMessage').classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('errorMessage').textContent = 'Error: Failed to reset password.';
        document.getElementById('errorMessage').classList.remove('hidden');
    }
});

