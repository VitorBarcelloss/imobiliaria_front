document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formLogin').addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fazerLogin(username, password);
    });
});

function fazerLogin(username, password) {
    if (!username || !password) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            login: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta da API:', data); // Adicionando log da resposta da API
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user)
        window.location.href = 'home.html';
    })
    .catch(error => {
        console.error('Erro no login:', error);
        alert('Usuário ou senha incorretos!');
    });

}