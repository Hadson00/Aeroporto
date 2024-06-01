function consultar(){
    var bt = document.getElementById('btCallIn');
    bt.onclick = climaAeroporto;
}

function limpaTexto(){
    var texto = document.getElementById('clima');
    texto.value = '';
}

function climaAeroporto(){
    var weather = document.getElementById('state').value;
    switch(weather) {
        case 'SBBU':
            nameState = 'Bauru - SP';
            break;
        case 'SBCH':
            nameState = 'Chapecó - SC';
            break;
        case 'SBUL':
            nameState = 'Uberlândia - MG';
            break;
        case 'SBPA':
            nameState = 'Salgado Filho - RS';
            break;
        case 'SBCB':
            nameState = 'Cabo Frio - RJ';
            break;
        default:
            nameState = 'Estação Desconhecida';
            break;
    }
    var div = document.getElementById('result');
    var url = 'http://servicos.cptec.inpe.br/XML/estacao/' + weather + '/condicoesAtuais.xml';
    console.log(url);

    var request = new XMLHttpRequest();
    request.open('GET',url);

    request.onerror = function(e){
        div.innerHTML = 'Valor invalido!';
    }

    request.onload =()=>{
        var response=JSON.parse(request.responseText);
        if(response.erro === true){
            div.innerHTML = 'Código incorreto!';
        } else {
            div.innerHTML = 'Código: ' + response.codigo + '<br>' + 'Atualização :' + response.atualizacao
        }
    }
    request.send();
}