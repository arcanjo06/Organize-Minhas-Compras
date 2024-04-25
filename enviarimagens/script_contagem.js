function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

// Função para atualizar o contador de tempo
function atualizarContador() {
    // Data de referência: 16 de maio de 2023
    var dataReferencia = new Date('2023-05-16');
    // Data atual
    var dataAtual = new Date();

    // Calcula a diferença entre as datas em milissegundos
    var diferenca = dataAtual.getTime() - dataReferencia.getTime();

    // Calcula dias, horas, minutos e segundos
    var dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Atualiza o contador na página
    document.getElementById('contador').innerHTML = dias + " Dias "+formatTime(horas) + " Horas " + formatTime(minutos) + " Minutos e " + formatTime(segundos) + " Segundos";

    // Chama a função a cada segundo
    setTimeout(atualizarContador, 1000);
}
atualizarContador();