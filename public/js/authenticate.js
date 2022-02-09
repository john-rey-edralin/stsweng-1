window.onload = () => {
    const usernameField = document.querySelector('#username');
    usernameField.value = '';

    const loginButton = document.querySelector('#login-submit');
    const passwordField = document.querySelector('#password');
    const errorMessage = document.querySelector('#error');

    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const data = {
            username: usernameField.value,
            password: passwordField.value,
        };

        const response = await fetch('/authenticate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (result.isError) {
            errorMessage.innerText = result.error;
        } else {
            console.log('hello');
            window.location.href = '/event-tracker/home';
        }
    });
};
