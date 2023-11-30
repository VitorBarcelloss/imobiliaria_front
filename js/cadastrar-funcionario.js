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

        const authRegisterData = {
            login: creci,
            password: senha,
            role: "FUNCIONARIO"
        };

        fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authRegisterData)
        })
        .then(response1 => {
            if(response1.ok){
                const dataProprietario = {
                    nome: nome,
                    creci: creci,
                    endereco: endereco,
                    email: email,
                    telefone: telefone
                };

                return fetch(`http://localhost:8080/funcionarios/criarFuncionario/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataProprietario)
                });
            } else{
                throw new Error('Este CRECI ja esta cadastrado!');
            }
        })
        .then(response2 => {
            if (response2.ok) {
                console.log('Funcionário criado e registrado com sucesso!');
                window.location.href = 'todos-funcionarios.html';
            } else {
                throw new Error('Erro ao criar funcionário');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert(error.message);
        });
    });
});
