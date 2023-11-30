document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');

    button.addEventListener('click', () => {
        const nome = document.querySelector('input[name=nome]').value;
        const cnpj = document.querySelector('input[name=cnpj]').value;
        const endereco = document.querySelector('input[name=endereco]').value;
        const email = document.querySelector('input[name=email]').value;
        const telefone = document.querySelector('input[name=telefone]').value;
        const senha = document.querySelector('input[name=senha]').value;

        const authRegisterData = {
            login: cnpj,
            password: senha,
            role: "EMPRESA"
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
                    cnpj: cnpj,
                    endereco: endereco,
                    email: email,
                    telefone: telefone
                };

                return fetch('http://localhost:8080/empresa/criarEmpresa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataProprietario)
                });
            } else{
                throw new Error('Este CNPJ ja esta cadastrado!');
            }
        })
        .then(response2 => {
            if (response2.ok) {
                console.log('Empresa criada e registrada com sucesso!');
                window.location.href = 'login-empresa.html';
            } else {
                throw new Error('Erro ao criar empresa');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert(error.message);
        });
    });
});
