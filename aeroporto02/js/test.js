describe("Testando a função climaAeroporto", function() {
    // Primeiro teste: verificar se a URL correta é construída para a estação selecionada
    it("deve construir a URL correta para a estação selecionada", function() {
        // Cria um elemento <select> dinamicamente e o adiciona ao DOM
        var stateSelect = document.createElement("select");
        stateSelect.id = "state";
        document.body.appendChild(stateSelect);
        
        // Cria uma opção com o valor "SBBU" e a adicionaao <select>
        var option = document.createElement("option");
        option.value = "SBBU";
        stateSelect.appendChild(option);
        stateSelect.value = "SBBU";

        spyOn(window, 'climaAeroporto').and.callThrough();
        climaAeroporto();
        
        // Verificamos se a URL correta foi acessada
        var expectedUrl = 'http://servicos.cptec.inpe.br/XML/estacao/SBBU/condicoesAtuais.xml';
        expect(console.log).toHaveBeenCalledWith(expectedUrl);

        document.body.removeChild(stateSelect);
    });

    // Segundo teste: verificar se a função exibe uma mensagem de erro para estação desconhecida
    it("deve exibir erro para estação desconhecida", function() {
        var stateSelect = document.createElement("select");
        stateSelect.id = "state";
        document.body.appendChild(stateSelect);

        var option = document.createElement("option");
        option.value = "XXX";
        stateSelect.appendChild(option);
        stateSelect.value = "XXX";

        var resultDiv = document.createElement("div");
        resultDiv.id = "result";
        document.body.appendChild(resultDiv);

        spyOn(window, 'climaAeroporto').and.callThrough();
        spyOn(XMLHttpRequest.prototype, 'open').and.callFake(function(method, url) {});
        spyOn(XMLHttpRequest.prototype, 'send').and.callFake(function() {
            this.status = 404; // Define o erro como 404
            this.onload(); // Chamamos o método onload para simular a resposta
        });

        climaAeroporto();
        
        // Verifica se a mensagem de erro correta é exibida
        expect(resultDiv.innerHTML).toBe('Erro ao realizar a requisição: 404');

        document.body.removeChild(stateSelect);
        document.body.removeChild(resultDiv);
    });
});
