document.addEventListener('DOMContentLoaded', () => {
    const cadastrarButton = document.getElementById('cadastrar');

    const urlParams = new URLSearchParams(window.location.search);
    const funcionarioId = urlParams.get('id');

    cadastrarButton.addEventListener('click', () => {
        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;

        const dataFuncionario = {
            creci:'',
            nome: nome,
            endereco: endereco,
            email: email,
            telefone: telefone
        };

        fetch(`http://localhost:8080/funcionarios/alterarFuncionario/${funcionarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataFuncionario)
        })
        .then(response => {
            if (response.ok) {
                console.log('Funcionário atualizado com sucesso!');
                window.location.href = 'todos-funcionarios.html'; 
            } else {
                console.error('Erro ao atualizar funcionário');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});
