document.addEventListener('DOMContentLoaded', () => {
    const cadastrarButton = document.getElementById('cadastrar');

    const user = localStorage.getItem('user');

    cadastrarButton.addEventListener('click', () => {
        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;

        const dataFuncionario = {
            nome: nome,
            endereco: endereco,
            email: email,
            telefone: telefone
        };

        fetch(`http://localhost:8080/proprietario/alterarProprietario/${user}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataFuncionario)
        })
        .then(response => {
            if (response.ok) {
                console.log('Proprietario atualizado com sucesso!');
                window.location.href = 'home.html'; 
            } else {
                console.error('Erro ao atualizar funcionário');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});
