
/** código para verificar o token */
var token = sessionStorage.getItem("token");
var listaQuadros = document.getElementById("id_lista_quadros");

if(token){//permanece na página

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

    listarQuadros();

    var divBotaoCriarQuadro = document.createElement("div");
    divBotaoCriarQuadro.setAttribute("class", "col-md-2 div_botao_criar_quadro");
    var botaoCriarQuadro = document.createElement("input");
    botaoCriarQuadro.setAttribute("type", "button");
    botaoCriarQuadro.setAttribute("class", "btn btn-outline-success botao_criar_quadro");
    botaoCriarQuadro.setAttribute("id", "id_botao_criar_quadro");
    botaoCriarQuadro.setAttribute("data-toggle", "modal");
    botaoCriarQuadro.setAttribute("data-target", "#exampleModal");
    botaoCriarQuadro.setAttribute("value", "Criar Quadro");
    divBotaoCriarQuadro.appendChild(botaoCriarQuadro);
    
    listaQuadros.appendChild(divBotaoCriarQuadro);

    botaoCriarQuadro.addEventListener("click", function(e){
        criarModalQuadro();
        var modalQuadro = document.getElementById("id_modal_quadro");
        modalQuadro.style.display="block";

        //fecha modal ao clicar fora
        window.onclick = function(event) {
            if (event.target == modalQuadro) {
                listaQuadros.removeChild(modalQuadro);
                //criarModalCartao(idCartao);
            }
        }

        //fecha modal ao clicar no botão fechar
        var spanFechaModal = document.getElementsByClassName("close_modal_quadro")[0];
        spanFechaModal.onclick = function() {
            listaQuadros.removeChild(modalQuadro);
            //criarModalCartao(idCartao);
        }

        var botaoAdicionarQuadro = document.getElementById("id_botao_adicionar_quadro");
        botaoAdicionarQuadro.addEventListener("click", function(e){
            e.preventDefault();
            var nomeQuadro = document.getElementById("id_titulo_quadro").value;
            var corQuadro = document.getElementById("id_cor_quadro").value;
            console.log(nomeQuadro+", "+corQuadro);
            cadastrarQuadro(nomeQuadro, corQuadro);     
        });
    });
}else{
    //redir login
    window.location.href = "index.html";
}

function criarQuadro(idQuadro, nomeQuadro, corQuadro){
    if(idQuadro != undefined){
        
        var divQuadro = document.createElement("div");
        divQuadro.setAttribute("class", "col-md-2");
        divQuadro.setAttribute("id", idQuadro);
        divQuadro.style.cursor="pointer";
        divQuadro.style.padding="3px";

        var quadro = document.createElement("div");
        quadro.setAttribute("class", "quadro");
        quadro.style.background=corQuadro;
        quadro.style.padding="3%";
        quadro.style.borderRadius="5px";

        divQuadro.addEventListener("click", function(e){
            //e.preventDefault();
            e.stopPropagation();
            if(e.toElement.getAttribute("id") == null){
            sessionStorage.setItem("id_quadro", idQuadro); // variável session com o id do quadro para ser acessado no arquivo quadro.js.
            window.location.href = "quadro.html";
            }
            
        }); 
      

        divQuadro.appendChild(quadro);
        listaQuadros.appendChild(divQuadro);
        
        var tituloQuadro = document.createElement("input");
        tituloQuadro.setAttribute("required", "required");
        tituloQuadro.setAttribute("type", "text");
        tituloQuadro.setAttribute("value", nomeQuadro);
        tituloQuadro.setAttribute("id", "id_titulo_quadro_criacao");
        tituloQuadro.style.margin="2% 2% 2% 2%";
        tituloQuadro.style.width="80%";
        tituloQuadro.style.background="transparent";
        tituloQuadro.style.border="none";
        tituloQuadro.style.fontWeight="bold";
        tituloQuadro.style.cursor="pointer";
        quadro.appendChild(tituloQuadro);

        tituloQuadro.addEventListener("blur", function(e){
            e.preventDefault();
            renomearQuadro(idQuadro, tituloQuadro.value);
        });

        var botaoExcluir = document.createElement("img")
        botaoExcluir.setAttribute("src", "https://img.icons8.com/ios/50/000000/empty-trash-filled.png");
        botaoExcluir.setAttribute("class", "botao_excluir");
        botaoExcluir.setAttribute("id", "id_botao_excluir");
        botaoExcluir.style.margin="1% 1% 1% 1%";
        quadro.appendChild(botaoExcluir);
        botaoExcluir.addEventListener("click", function(e){
            e.preventDefault();
            excluirQuadro(idQuadro);
        });

        var divCores = document.createElement("div");
        var corQuadro = document.createElement("input");
        corQuadro.setAttribute("type", "color");
        corQuadro.setAttribute("id", "id_cor_quadro_criacao");
        corQuadro.setAttribute("value", "#ff0000");
        divCores.appendChild(corQuadro); 

        corQuadro.addEventListener("change", function(e){
            quadro.style.background = this.value;
            alterarCorQuadro(idQuadro, this.value);
        });


        quadro.appendChild(divCores);
    }
}

function listarQuadros(){
        //requisição dos quadros
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var quadros = JSON.parse(this.responseText);
                for(var i=0; i<quadros.length; i++){
                    var nomeQuadro = quadros[i].name;
                    var idQuadro = quadros[i].id;
                    var corQuadro = quadros[i].color;
                    criarQuadro(idQuadro, nomeQuadro, corQuadro);
                }
    
    
            } 
        };
    
        var url = "https://tads-trello.herokuapp.com/api/trello/boards/"+token;
        xhttp.open("GET", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
}

function cadastrarQuadro(nomeQuadro, corQuadro){
        //dados do quadro 
        var dados = {
            name: nomeQuadro,
            color: corQuadro,
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
    
}

function excluirQuadro(idQuadro){
    var dados = {
        board_id: idQuadro,
        token: token
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            listaQuadros.removeChild(document.getElementById(idQuadro));
        } 
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/boards/delete";
    xhttp.open("DELETE", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));
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

    listaQuadros.appendChild(modalQuadro);
}

function renomearQuadro(idQuadro, novoNome){
    var dados = {
        board_id: idQuadro,
        name: novoNome,
        token: token
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {} 
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/boards/rename";
    xhttp.open("PATCH", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));

}

function alterarCorQuadro(idQuadro, novaCor){
    var dados = {
        board_id: idQuadro,
        color: novaCor,
        token: token
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {} 
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/boards/newcolor";
    xhttp.open("PATCH", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));

}