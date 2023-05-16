const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('../php/executeLogin.php', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            switch (data.user) {
                case 'not_found':
                    alert('Nessun utente trovato!');
                    break;
                case 'found':
                    const name = data.name;
                    const expirationDate = new Date();
                    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                    document.cookie = `name=${name}; expires=${expirationDate.toUTCString()}; path=/`;
                    window.location.href = '../../index.html';
            }
        });
});