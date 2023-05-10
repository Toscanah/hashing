const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const welcomeContainer = document.getElementById('welcome');

loginBtn.addEventListener('click', (e) => {
    window.location.href = 'src/routes/login-page.html';
});

registerBtn.addEventListener('click', (e) => {
    window.location.href = 'src/routes/register-page.html';
});

fetch('src/php/getUser.php', {
    method: 'POST',

})