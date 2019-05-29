/** código para verificar o token */
var token = sessionStorage.getItem("token");
console.log(token);
if(token){//Continua na página
    
    var botaoCriarQuadro = document.getElementById("id_botao_criar_quadro");
    var botaoSair = document.getElementById("id_botao_sair");

    botaoSair.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = "index.html";
    });

    botaoCriarQuadro.addEventListener("click", function(e){
    e.preventDefault();

    var tituloQuadro = document.getElementById("id_titulo_quadro");
    var corQuadro = document.getElementById("id_cor_quadro");

    //dados do quadro 
    var dados = {
        name: tituloQuadro.value,
        color: corQuadro.value,
        token: token
    };


    //requisição para envio do quadro
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            sessionStorage.setItem("id_quadro", obj.id); // variável session com o id do quadro para ser acessado no arquivo quadro.js.
            window.location.href = "quadro.html";
        } 
    };
    var url = " https://tads-trello.herokuapp.com/api/trello/boards/new";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));
    });


} else {
    //Redirecionar para o login
    window.location.href = "index.html";
}






