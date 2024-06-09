// ao clicar no botao de id = btCallIn, a função airportWeather é ativada
function consult(){
    var bt = document.getElementById('btCallIn');
    bt.onclick = airportWeather;
}

// ao clicar, limpa tanto os dados da div "result", quanto a caixa de opções
function cleanText(){
    var texto = document.getElementById('result');
    texto.innerHTML = '';
}

// função principal, com as seguintes funções:
// modifica o nome dos estados com base em seus valores
// busca a url do xml e a altera
// altera os dados do xml e mostra na div de id = result
function airportWeather(){
    // insere os valores das opções do select na variável
    var state = document.getElementById('state').value; 
    // substitui os nomes dos estados no resultado final
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
    // link do xml, substituindo o código da url
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
                // altera as informações pela tag name dos elementos do xml
                if (metar) { 
                    var code = metar.getElementsByTagName("codigo")[0].textContent;
                    var temperature = metar.getElementsByTagName("temperatura")[0].textContent;
                    var update = metar.getElementsByTagName("atualizacao")[0].textContent;
                    var description = metar.getElementsByTagName("tempo_desc")[0].textContent;
                    var moisture = metar.getElementsByTagName("umidade")[0].textContent;
                    var pressure = metar.getElementsByTagName("pressao")[0].textContent;
                    var sig = metar.getElementsByTagName("tempo")[0].textContent;

                    // mostra os dados obtidos na div "result"
                    switch(state) { 
                        case 'SBBU':
                            var result = document.getElementById('result1')
                            result.innerHTML = `<div style='text-aling: center'>
                                Código: ${code}<br>
                                Aeroporto: ${nameState}<br>
                                Atualização: ${update}<br>
                                Temperatura: ${temperature} ºC<br>
                                Sigla: ${sig}<br>
                                Descrição: ${description}<br>
                                Pressão: ${pressure} mb <br>
                                Umidade: ${moisture}<br>
                                </div>
                            `;
                            break;
                        case 'SBCH':
                            var result = document.getElementById('result2')
                            result.innerHTML = `<div style='text-aling: center'>
                                Código: ${code}<br>
                                Aeroporto: ${nameState}<br>
                                Atualização: ${update}<br>
                                Temperatura: ${temperature} ºC<br>
                                Sigla: ${sig}<br>
                                Descrição: ${description}<br>
                                Pressão: ${pressure} mb <br>
                                Umidade: ${moisture}<br>
                                </div>
                            `;
                            break;
                        case 'SBUL':
                            var result = document.getElementById('result3')
                            result.innerHTML = `<div style='text-aling: center'>
                                Código: ${code}<br>
                                Aeroporto: ${nameState}<br>
                                Atualização: ${update}<br>
                                Temperatura: ${temperature} ºC<br>
                                Sigla: ${sig}<br>
                                Descrição: ${description}<br>
                                Pressão: ${pressure} mb <br>
                                Umidade: ${moisture}<br>
                                </div>
                            `;
                            break;
                        case 'SBLO':
                            var result = document.getElementById('result5')
                            result.innerHTML = `<div style='text-aling: center'>
                                Código: ${code}<br>
                                Aeroporto: ${nameState}<br>
                                Atualização: ${update}<br>
                                Temperatura: ${temperature} ºC<br>
                                Sigla: ${sig}<br>
                                Descrição: ${description}<br>
                                Pressão: ${pressure} mb <br>
                                Umidade: ${moisture}<br>
                                </div>
                            `;
                            break;
                        case 'SBCB':
                            var result = document.getElementById('result4')
                            result.innerHTML = `<div style='text-aling: center'>
                                Código: ${code}<br>
                                Aeroporto: ${nameState}<br>
                                Atualização: ${update}<br>
                                Temperatura: ${temperature} ºC<br>
                                Sigla: ${sig}<br>
                                Descrição: ${description}<br>
                                Pressão: ${pressure} mb <br>
                                Umidade: ${moisture}<br>
                                </div>
                            `;
                            break;
                    }
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
}