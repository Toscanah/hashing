const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('../php/addAccount.php', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            surname: surname,
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                window.location.href = 'login-page.html';
            } else {
                alert('Account gia\' esistente');
            }
        });
});