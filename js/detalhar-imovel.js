document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idImovel = urlParams.get('id');
    const user = localStorage.getItem('user');

    function buscarDetalhesImovel() {
        fetch(`http://localhost:8080/imovel/detalharImovel/${idImovel}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('titulo').textContent = data.titulo;
                document.getElementById('precoSup').textContent = `R$ ${data.preco}`;
                document.querySelector('.fotoPrincipal').src = 'data:image/png;base64, ' + data.imagens[0].base64;
                document.getElementById('precoInf').textContent = `R$ ${data.preco}`;
                document.getElementById('descricao').textContent = data.descricao;
                document.getElementById('precoIPTU').textContent = `R$ ${data.iptu}`;
                document.getElementById('precoCondominio').textContent = `R$ ${data.condominio}`;
                document.getElementById('rua').textContent = data.localizacao;
                document.getElementById('cep').textContent = `CEP ${data.cep}`;
                document.getElementById('tipo').textContent = `Tipo de venda: ${data.tipo}`;
                document.getElementById('mobilia').textContent = `Mobiliado ou não: ${data.mobiliado}`;
                document.getElementById('quartos').textContent = `Nº de quartos: ${data.quartos}`;
                document.getElementById('tamanho').textContent = `Área: ${data.tamanho}m²`;
                document.getElementById('comodos').textContent = `Comodos gerais: ${data.comodos}`;
                document.getElementById('nome').textContent = data.proprietario.nome;
                document.getElementById('telefone').textContent = data.proprietario.telefone;

            })
            .catch(error => console.error('Erro ao buscar detalhes do imóvel:', error));
    }

    buscarDetalhesImovel();
});