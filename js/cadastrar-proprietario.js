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

        const authRegisterData = {
            login: cpf,
            password: senha,
            role: "PROPRIETARIO"
        };

        fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authRegisterData)
        })
        .then(response => {
            if(response.ok){
                console.log("Usuário registrado");
                const dataProprietario = {
                    nome: nome,
                    cpf: cpf,
                    endereco: endereco,
                    email: email,
                    telefone: telefone
                };

                return fetch('http://localhost:8080/proprietario/criarProprietario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataProprietario)
                });
            } else{
                throw new Error("Este CPF já está cadastrado!");
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Proprietário criado');
                console.log('Ambas as requisições foram bem-sucedidas!');
                window.location.href = 'login-proprietario.html';
            } else {
                throw new Error('Erro ao criar proprietário');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert(error.message);
        });
    });
});
