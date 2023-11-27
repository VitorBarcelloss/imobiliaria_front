document.addEventListener('DOMContentLoaded', () => {
    const secaoTotal = document.getElementById('secao-total');
  
    function criarElementoImagem(base64) {
      const imagem = document.createElement('img');
      imagem.setAttribute('name', 'imagem-imovel');
      imagem.src = `data:image/png;base64, ${base64}`;
      return imagem;
    }
  
    function buscarDadosNaAPI() {
      fetch('http://localhost:8080/imovel/listarTodosImoveis')
        .then(response => response.json())
        .then(data => {
          const grupos = Math.ceil(data.length / 3);
          const divGrupo = document.createElement('div');
          divGrupo.classList.add('grupo-dinamico');
          for (let i = 0; i < grupos; i++) {
            
            var tamanho = 6;
            if(data.length<6){
                tamanho = data.length
            }

            for (let j = i * 3; j < (i + 1) * 3 && j < tamanho; j++) {
              const imovel = data[j];
  
              const divImovel = document.createElement('div');
              divImovel.classList.add('imovel-dinamico');
  
              imovel.imagens.forEach(img => {
                const imagem = criarElementoImagem(img.base64);
                divImovel.appendChild(imagem);
              });

              const preco = document.createElement('h4');
              preco.setAttribute('name', 'preco-imovel');
              preco.textContent = `R$ ${imovel.preco}`;
              divImovel.appendChild(preco);
  
              const titulo = document.createElement('p');
              titulo.setAttribute('name', 'titulo-imovel');
              titulo.textContent = ` ${imovel.titulo}`;
              divImovel.appendChild(titulo);
  
              const divLocal = document.createElement('div');
              divLocal.setAttribute('id', 'local');
  
              const localizacao = document.createElement('p');  
              localizacao.setAttribute('name', 'localizacao-imovel');
              localizacao.textContent = `${imovel.localizacao}`;
              divLocal.appendChild(localizacao);
  
              const botaoVerMais = document.createElement('button');
              botaoVerMais.textContent = 'Ver mais ->';
              divLocal.appendChild(botaoVerMais);
  
              divImovel.appendChild(divLocal);
              divGrupo.appendChild(divImovel);
            }
  
           
          }
          secaoTotal.appendChild(divGrupo);
          
        })
        .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
        });
    }
  
    buscarDadosNaAPI();
  });