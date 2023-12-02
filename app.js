let listaDeNumerosSecretos = [];
let limite = 3;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()* limite + 1);
    let quantidadeDeNumerosEscolhidos = listaDeNumerosSecretos.length;

    if(quantidadeDeNumerosEscolhidos == limite) {
        listaDeNumerosSecretos = [];
    }
    
    if(listaDeNumerosSecretos.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }
    else {
        listaDeNumerosSecretos.push(numeroEscolhido);
        console.log(listaDeNumerosSecretos);
        return numeroEscolhido;
    }
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
console.log(numeroSecreto);

function verificarChute(){
    let chute = document.querySelector('input').value;

    let condicao = chute == numeroSecreto;
    let condicao2 = chute < numeroSecreto;
    let titulo = condicao ? 'Você Acertou!' : 'Errou! :(';
    let palavraTentativas = tentativas == 1 ? 'tentativa' : 'tentativas;'
    let paragrafo = condicao ? `Parabéns, você descobriu o número secreto com ${tentativas} ${palavraTentativas}` : 'tente novamente';
    let mensagemDica = condicao2 ? `O número secreto é maior, ${paragrafo}` : `O número secreto é menor, ${paragrafo}`;

    if(condicao){
        exibirTextoNaTela('h1', titulo);
        exibirTextoNaTela('p', paragrafo);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } 
    else {
        if (condicao2){
            exibirTextoNaTela('h1', titulo);
            exibirTextoNaTela('p', mensagemDica);
        }
        else{
            exibirTextoNaTela('h1', titulo);
            exibirTextoNaTela('p', mensagemDica);
        }
        limparCampo();
    }

    tentativas++;
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}