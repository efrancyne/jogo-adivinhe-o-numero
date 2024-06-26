let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto, append = false){
    let campo = document.querySelector(tag);
    if (append) {
        campo.innerHTML += texto;
    } else {
        campo.innerHTML = texto;
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}
exibirMensagemInicial();




function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagensTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagensTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else if(chute > numeroSecreto){
        exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
    }else{
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
    }

    atualizarHistorico(chute);
    tentativas++;
    limparCampo();

}



function atualizarHistorico(chute){
    let listaHistorico = document.getElementById('listaHistorico');
        let itemHistorico = document.createElement('li');
        let textHistorico = document.createElement('p')
        itemHistorico.textContent = chute;
        itemHistorico.textContent = chute;
        listaHistorico.appendChild(itemHistorico)

}

function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementoNaLista = listaDeNumerosSorteados.length;
   if(quantidadeDeElementoNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
   }
   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   }else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

    let listaHistorico = document.getElementById('listaHistorico');
    listaHistorico.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const inputNumero = document.getElementById('numero');

    inputNumero.addEventListener('keyup', function(event) {
    
        if (event.key === 'Enter') {
            
            verificarChute();
        }
    });
});



