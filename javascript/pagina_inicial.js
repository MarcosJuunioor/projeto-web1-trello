/** código para verificar o token */
var token = sessionStorage.getItem("token");

if(token){//Continua na página
    
    var botaoCriarQuadro = document.getElementById("id_criar_quadro");
    var botaoAcessarQuadros = document.getElementById("id_acessar_quadros");
    var botaoSair = document.getElementById("id_botao_sair");
    var home = document.getElementById("id_home");

    //redirecionamento para página inicial ao clicar em "home"
    home.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = "pagina_inicial.html";
    });
    
    //redirecionamento para tela de login ao clicar em "sair"
    botaoSair.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = "index.html";
    });

    botaoCriarQuadro.addEventListener("click", function(e){
        criarModalQuadro();
        var modalQuadro = document.getElementById("id_modal_quadro");
        modalQuadro.style.display="block";

        var botaoAdicionarQuadro = document.getElementById("id_botao_adicionar_quadro");
        botaoAdicionarQuadro.addEventListener("click", function(e){
            //dados do quadro 
            var dados = {
                name: document.getElementById("id_titulo_quadro").value,
                color: document.getElementById("id_cor_quadro").value,
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
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(dados));
    
        });


        //fecha modal ao clicar no botão fechar
        var spanFechaModal = document.getElementsByClassName("close_modal_quadro")[0];
        spanFechaModal.onclick = function() {
            document.body.removeChild(modalQuadro);
        }
    });

    botaoAcessarQuadros.addEventListener("click", function(e){
        window.location.href = "lista_quadros.html";    
    });


} else {
    //Redirecionar para o login
    window.location.href = "index.html";
}

//função responsável por criar o modal dos cartões, para exibição do form
function criarModalQuadro(){

    var modalQuadro = document.createElement("div");
    modalQuadro.setAttribute("class", "modal_quadro");
    modalQuadro.setAttribute("id", "id_modal_quadro");

    var formQuadro = document.createElement("form");
    modalQuadro.appendChild(formQuadro);

    var conteudoModalQuadro = document.createElement("div");
    conteudoModalQuadro.setAttribute("class", "conteudo_modal_quadro");
    conteudoModalQuadro.setAttribute("id", "#id_modal_content_quadro");
    formQuadro.appendChild(conteudoModalQuadro);

    var spanCloseModal = document.createElement("span");
    spanCloseModal.setAttribute("class", "close_modal_quadro");
    spanCloseModal.innerHTML="&times;";
    conteudoModalQuadro.appendChild(spanCloseModal);


    var divTitulo = document.createElement("div");
    divTitulo.setAttribute("class", "form-group");
    var inputTitulo = document.createElement("input");
    inputTitulo.setAttribute("type", "text");
    inputTitulo.setAttribute("class", "form-control");
    inputTitulo.setAttribute("id", "id_titulo_quadro");    
    inputTitulo.setAttribute("placeholder", "Título do quadro..."); 
    var labelTitulo = document.createElement("label");
    labelTitulo.setAttribute("for", "id_titulo_quadro"); 
    labelTitulo.innerHTML="Título";
    divTitulo.appendChild(labelTitulo); 
    divTitulo.appendChild(inputTitulo); 
    conteudoModalQuadro.appendChild(divTitulo); 

    var divCores = document.createElement("div");
    var corQuadro = document.createElement("input");
    corQuadro.setAttribute("type", "color");
    corQuadro.setAttribute("id", "id_cor_quadro");
    corQuadro.setAttribute("value", "#ff0000");
    var labelCor = document.createElement("label");
    labelCor.setAttribute("for", "id_cor_quadro"); 
    labelCor.innerHTML="Cor";
    divCores.appendChild(labelCor); 
    divCores.appendChild(document.createElement("br")); 
    divCores.appendChild(corQuadro); 
    conteudoModalQuadro.appendChild(divCores);

    var divBotaoAdicionarQuadro = document.createElement("div");
    var botaoAdicionarQuadro = document.createElement("input");
    botaoAdicionarQuadro.setAttribute("type", "button");
    botaoAdicionarQuadro.setAttribute("class", "btn btn-success btn-sm");
    botaoAdicionarQuadro.setAttribute("id", "id_botao_adicionar_quadro");
    botaoAdicionarQuadro.style.marginTop="2%";
    botaoAdicionarQuadro.value="Adicionar";
    divBotaoAdicionarQuadro.appendChild(botaoAdicionarQuadro);
    conteudoModalQuadro.appendChild(divBotaoAdicionarQuadro);

    document.body.appendChild(modalQuadro);
}





