document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista');
    const id = localStorage.getItem('user');

    function buscarDadosNaAPI() {
        fetch(`http://localhost:8080/empresa/listarFuncionariosEmpresa/${id}`)
            .then(response => response.json())
            .then(data => {
                var tamanho = 5;
                if (data.length < 5) {
                    tamanho = data.length;
                }

                for (let j = 0; j < tamanho; j++) { // Ajuste na condição do loop
                    const ulFuncionario = document.createElement('ul');
                    const funcionario = data[j];

                    if (funcionario) { // Verificação se funcionario é definido
                        const liCreci = document.createElement('li');
                        liCreci.textContent = `Creci: ${funcionario.creci}`;
                        ulFuncionario.appendChild(liCreci);

                        const liNome = document.createElement('li');
                        liNome.textContent = `Nome: ${funcionario.nome}`;
                        ulFuncionario.appendChild(liNome);

                        const liDetalhar = document.createElement('li');
                        const aDetalhar = document.createElement('a');
                        aDetalhar.textContent = 'Detalhar';
                        aDetalhar.addEventListener("click", function () {
                            window.location.href = `detalhar-funcionario.html?id=${funcionario.creci}`;
                        });
                        liDetalhar.appendChild(aDetalhar);
                        ulFuncionario.appendChild(liDetalhar);

                        const liAlterar = document.createElement('li');
                        const aAlterar = document.createElement('a');
                        aAlterar.textContent = 'Alterar';
                        aAlterar.addEventListener("click", function () {
                            window.location.href = `alterar-funcionario.html?id=${funcionario.creci}`;
                        });
                        aAlterar.setAttribute('id', funcionario.creci);
                        liAlterar.appendChild(aAlterar);
                        ulFuncionario.appendChild(liAlterar);

                        const imgExcluir = document.createElement('img');
                        imgExcluir.src = "../../img/excluir.png";
                        imgExcluir.addEventListener("click", function () {
                            const confirmarExclusao = confirm("Tem certeza que deseja excluir este funcionário?");
                            if (confirmarExclusao) {
                                const funcionarioId = funcionario.creci;

                                fetch(`http://localhost:8080/funcionarios/deletarFuncionario/${funcionarioId}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(response => {
                                        if (response.ok) {
                                            console.log('Funcionário deletado com sucesso!');
                                            ulFuncionario.remove();
                                        } else {
                                            console.error('Erro ao deletar funcionário');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Erro:', error);
                                    });
                            }
                        });
                        imgExcluir.setAttribute('class', 'excluir');
                        ulFuncionario.appendChild(imgExcluir);
                        lista.appendChild(ulFuncionario);
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }

    buscarDadosNaAPI();
});
