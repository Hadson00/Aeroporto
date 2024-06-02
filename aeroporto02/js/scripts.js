function consultar(){
    var bt = document.getElementById('btCallIn');
    bt.onclick = climaAeroporto;
}

function limpaTexto(){
    var texto = document.getElementById('clima');
    texto.value = '';
}

function climaAeroporto(){
    var state = document.getElementById('state').value;
    switch(state) {
        case 'SBBU':
            nameState = 'Bauru - SP';
            break;
        case 'SBCH':
            nameState = 'Chapecó - SC';
            break;
        case 'SBUL':
            nameState = 'Uberlândia - MG';
            break;
        case 'SBLO':
            nameState = 'Londrina - PR';
            break;
        case 'SBCB':
            nameState = 'Cabo Frio - RJ';
            break;
        default:
            nameState = 'Estação Desconhecida';
            break;
    }
    var result = document.getElementById('result');
    var url = 'http://servicos.cptec.inpe.br/XML/estacao/' + state + '/condicoesAtuais.xml';
    console.log(url);

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType("application/xml;charset=utf-8");
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onerror = function(){
        result.innerHTML = 'VALOR INVÁLIDO!';
    }

    xmlhttp.onload = function() {
        if (xmlhttp.status === 200) {
            var xmlDoc = xmlhttp.responseXML;
            if (xmlDoc) {
                var metar = xmlDoc.getElementsByTagName("metar")[0];
                if (metar) {
                    var codigo = metar.getElementsByTagName("codigo")[0].textContent;
                    var temperatura = metar.getElementsByTagName("temperatura")[0].textContent;
                    var atualizacao = metar.getElementsByTagName("atualizacao")[0].textContent;
                    var descricao = metar.getElementsByTagName("tempo_desc")[0].textContent;
                    var umidade = metar.getElementsByTagName("umidade")[0].textContent;
                    var pressao = metar.getElementsByTagName("pressao")[0].textContent;
                    var sig = metar.getElementsByTagName("tempo")[0].textContent;


                    result.innerHTML = `<div style='text-align: center'>
                        Código: ${codigo}<br>
                        Aeroporto: ${nameState}<br>
                        Atualização: ${atualizacao}<br>
                        Temperatura: ${temperatura}°C<br>
                        Sigla: ${sig}<br>
                        Descrição: ${descricao}<br>
                        Pressão: ${pressao} mb <br>
                        Umidade: ${umidade}%<br>
                        </h5></div>
                    `;
                } else {
                    result.innerHTML = 'Dados não disponíveis para a estação.';
                }
            } else {
                result.innerHTML = 'Erro ao processar a resposta XML.';
            }
        } else {
            result.innerHTML = 'Erro ao realizar a requisição: ' + xmlhttp.status;
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    // var request = new XMLHttpRequest();
    // request.open('GET',url);

    // request.onerror = function(e){
    //     result.innerHTML = 'Valor invalido!';
    // }

    // request.onload =()=>{
    //     var response=JSON.parse(request.responseText);
    //     if(response.erro === true){
    //         result.innerHTML = 'Código incorreto!';
    //     } else {
    //         result.innerHTML = 'Código: ' + response.codigo + '<br>' + 'Atualização :' + response.atualizacao
    //     }
    // }
    // request.send();
}