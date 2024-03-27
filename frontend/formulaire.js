document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });
    try {
        const response = await fetch('http://127.0.0.1:3000/user/sign-up-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        const data = await response.json();
        console.log(data);
        document.getElementById('signupMessage').classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById('signinForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const requestData = {};
    formData.forEach((value, key) => {
        requestData[key] = value;
    });
    try {
        const response = await fetch('http://127.0.0.1:3000/user/sign-in-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.message); 
            document.getElementById('signinMessage').classList.remove('hidden');
        } else {
            console.error('Error:', response.statusText);
            document.getElementById('error-message').classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});



