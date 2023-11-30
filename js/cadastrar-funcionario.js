document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    const id = localStorage.getItem('user');

    button.addEventListener('click', () => {
        const nome = document.querySelector('input[name=nome]').value;
        const creci = document.querySelector('input[name=creci]').value;
        const endereco = document.querySelector('input[name=endereco]').value;
        const email = document.querySelector('input[name=email]').value;
        const telefone = document.querySelector('input[name=telefone]').value;
        const senha = document.querySelector('input[name=senha]').value;

        if (nome === '' || creci === '' || endereco === '' || email === '' || telefone === '' || senha === '') {
            alert('Por favor, preencha todos os campos.');
            return; 
        }

        const dataProprietario = {
            nome: nome,
            creci: creci,
            endereco: endereco,
            email: email,
            telefone: telefone
        };

        // Enviar para o primeiro endpoint (criarProprietario)
        const request1 = fetch(`http://localhost:8080/funcionarios/criarFuncionario/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataProprietario)
        });

        // Enviar para o terceiro endpoint (/auth/register)
        const authRegisterData = {
            login: creci,
            password: senha,
            role: "FUNCIONARIO"
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
                    window.location.href = 'todos-funcionarios.html'; 
                } else {
                    console.error('Erro em uma ou ambas as requisições');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    });
});