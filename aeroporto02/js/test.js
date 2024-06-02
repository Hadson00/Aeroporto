describe("Testando a função climaAeroporto", function() {
    it("deve construir a URL correta para a estação selecionada", function() {
        var stateSelect = document.createElement("select");
        stateSelect.id = "state";
        document.body.appendChild(stateSelect);

        var option = document.createElement("option");
        option.value = "SBBU";
        stateSelect.appendChild(option);
        stateSelect.value = "SBBU";

        spyOn(window, 'climaAeroporto').and.callThrough();
        climaAeroporto();

        var expectedUrl = 'http://servicos.cptec.inpe.br/XML/estacao/SBBU/condicoesAtuais.xml';
        expect(console.log).toHaveBeenCalledWith(expectedUrl);

        document.body.removeChild(stateSelect);
    });

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
            this.status = 404;
            this.onload();
        });

        climaAeroporto();

        expect(resultDiv.innerHTML).toBe('Erro ao realizar a requisição: 404');

        document.body.removeChild(stateSelect);
        document.body.removeChild(resultDiv);
    });
});
