document.addEventListener('DOMContentLoaded', () => {
    const caixa = document.getElementById('caixa');
    const urlParams = new URLSearchParams(window.location.search);
    const funcionarioId = urlParams.get('id');


    function buscarDadosNaAPI() {
        fetch(`http://localhost:8080/funcionarios/detalharFuncionario/${funcionarioId}`)
            .then(response => response.json())
            .then(data => {
               
                        const funcionario = data;
  
                        const divCreci = document.createElement('div');
                        divCreci.textContent = ` ${funcionario.creci}`;
                        divCreci.setAttribute('class', 'creci')
                        caixa.appendChild(divCreci);

                        const divNome = document.createElement('div');
                        divNome.textContent = `${funcionario.nome}`;
                        divNome.setAttribute('class', 'nome')
                        caixa.appendChild(divNome);
                       
                        const divEndereco = document.createElement('div');
                        divEndereco.textContent = ` ${funcionario.endereco}`;
                        divEndereco.setAttribute('class', 'endereco')
                        caixa.appendChild(divEndereco);

                        const divEmail = document.createElement('div');
                        divEmail.textContent = ` ${funcionario.email}`;
                        divEmail.setAttribute('class', 'email')
                        caixa.appendChild(divEmail);

                        const divTelefone = document.createElement('div');
                        divTelefone.textContent = ` ${funcionario.telefone}`;
                        divTelefone.setAttribute('class', 'telefone')
                        caixa.appendChild(divTelefone);
                    
  
                   
                
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }
  
    buscarDadosNaAPI();
  });