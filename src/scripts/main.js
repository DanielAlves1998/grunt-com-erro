document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) { // esse vevento é para remover o comportamento padrão do formulário, e o comportamento padrão é atualizar a página automaticamente
        evento.preventDefault(); // o preventDefault é para previnir o comportamentp padrão, nesse caso do EVENTO
        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = math.random() * numeroMaximo;
        numeroAleatorio = math.floor (numeroAleatorio + 1); // o math.round é para aredondar os números aleatórios nesse caso, o + 1 é para não dar o numero 0

        document.getElementById('resultado-valor').innerText = numeroAleatorio // o innerText serve para escrever texto, e se fosse no html poderia ser usado o innerHTML
        document.querySelector('.resultado').computedStyleMap.display = 'block'; // serve para fazer sumir o número sorteado e só aparecer quando clicar em sortear
    })
})





