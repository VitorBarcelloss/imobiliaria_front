// Obtém referências para o botão e o menu suspenso
window.onload = function() {
    const botaoMenu = document.getElementById('bt-entrar');
    const menuSuspenso = document.getElementById('menuSuspenso');

    botaoMenu.addEventListener('click', function() {
      if (menuSuspenso.style.display === 'flex') {
        menuSuspenso.style.display = 'none';
      } else {
        menuSuspenso.style.display = 'flex';
      }
    });
  };