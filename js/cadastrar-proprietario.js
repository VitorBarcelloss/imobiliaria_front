document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');

    button.addEventListener('click', () => {
        const nome = document.querySelector('input[name=nome]').value;
        const cpf = document.querySelector('input[name=cpf]').value;
        const endereco = document.querySelector('input[name=endereco]').value;
        const email = document.querySelector('input[name=email]').value;
        const telefone = document.querySelector('input[name=telefone]').value;
        const senha = document.querySelector('input[name=senha]').value;

        if (nome === '' || cpf === '' || endereco === '' || email === '' || telefone === '' || senha === '') {
            alert('Por favor, preencha todos os campos.');
            return; 
        }

        const dataProprietario = {
            nome: nome,
            cpf: cpf,
            endereco: endereco,
            email: email,
            telefone: telefone
        };

        // Enviar para o primeiro endpoint (criarProprietario)
        const request1 = fetch('http://localhost:8080/proprietario/criarProprietario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataProprietario)
        });

        // Enviar para o terceiro endpoint (/auth/register)
        const authRegisterData = {
            login: cpf,
            password: senha,
            role: "PROPRIETARIO"
            // Você pode adicionar mais dados se necessário
        };

        const request2 = fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authRegisterData)
        });

        Promise.all([request1, request2])
            .then(responses => {
                const [response1, response2] = responses;

                if (response1.ok && response2.ok) {
                    console.log('Ambas as requisições foram bem-sucedidas!');
                    window.location.href = 'login-proprietario.html'; 
                } else {
                    console.error('Erro em uma ou ambas as requisições');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    });
});