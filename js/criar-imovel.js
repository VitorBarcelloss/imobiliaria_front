document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('user');
    const formData = new FormData(); // Criamos o FormData aqui para uso global

    const imagensInput = document.querySelector('input[name=imagem]');
    imagensInput.addEventListener('change', (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);
        }
    });

    const button = document.querySelector('button[name=botao]');
    button.addEventListener('click', () => {
        formData.append('titulo', document.querySelector('input[name=nome]').value);
        formData.append('tipo', document.querySelector('select[name=tipo]').value);
        formData.append('alocacao', document.querySelector('select[name=alocacao]').value);
        formData.append('preco', document.querySelector('input[name=preco]').value);
        formData.append('iptu', document.querySelector('input[name=iptu]').value);
        formData.append('condominio', document.querySelector('input[name=condominio]').value);
        formData.append('localizacao', document.querySelector('input[name=localizacao]').value);
        formData.append('mobiliado', document.querySelector('select[name=mobiliado]').value);
        formData.append('tamanho', document.querySelector('input[name=tamanho]').value);
        formData.append('comodos', document.querySelector('input[name=comodos]').value);
        formData.append('quartos', document.querySelector('input[name=quartos]').value);
        formData.append('cep', document.querySelector('input[name=cep]').value);
        formData.append('descricao', document.querySelector('input[name=descricao]').value);

        const request1 = fetch(`http://localhost:8080/imovel/criarImovel/${user}`, {
            method: 'POST',
            body: formData
        });

        Promise.all([request1])
            .then(responses => {
                const [response1] = responses;

                if (response1.ok) {
                    console.log('Requisição bem-sucedida!');
                    window.location.href = 'meus-anuncios.html';
                } else {
                    console.error('Erro na requisição');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    });
});
