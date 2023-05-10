const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
            console.error(err);
            return;
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                console.error(err);
                return;
            }

            console.log('Hashed Password:', hash);
        });
    });

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
                    const userId = sessionStorage.getItem('userId');
                    const expirationDate = new Date();
                    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                    document.cookie = `userId=${userId}; expires=${expirationDate.toUTCString()}; path=/`;
                    break;
            }
        });
});