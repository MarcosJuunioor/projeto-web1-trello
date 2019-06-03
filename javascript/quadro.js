//var token = sessionStorage.getItem("token");
//var idQuadro = sessionStorage.getItem("id_quadro");
//console.log(token);
var token = "Kou67xRBPpqdb9n6G8ae8Q";
var idQuadro = 2;

if(token){//permanece na página
    
    var body = document.getElementById("id_body");
    var nomeQuadro;
    var corQuadro;
    var cabecalho = document.getElementById("id_cabecalho");
    var quadro = document.getElementById("id_quadro");
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

    //requisição do quadro
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);

            nomeQuadro =  obj[0].name;
            corQuadro = obj[0].color;
            
            //Definição de cor de background e título
            body.style="background:"+corQuadro;
            var titulo = document.createElement("h3");
            titulo.innerHTML=nomeQuadro;
            cabecalho.appendChild(titulo);
            
            listarListas();
            
            //criação de lista
            criarLista();
         
            
            //botão "adicionar outra lista"
            botaoAdicionarLista = document.createElement("input");
            botaoAdicionarLista.setAttribute("type", "button");
            botaoAdicionarLista.setAttribute("class", "btn btn-light btn-sm");
            botaoAdicionarLista.value="Nova lista";
            botaoAdicionarLista.style.height="10%";
            botaoAdicionarLista.style.display="none";
            botaoAdicionarLista.style.marginLeft="0.4%";
            botaoAdicionarLista.style.marginTop="0.4%";
            quadro.appendChild(botaoAdicionarLista);    

            botaoAdicionarLista.addEventListener("click", function(e){
                criarLista();
                quadro.appendChild(botaoAdicionarLista);  //atualiza a posição do botão
                this.style.display="none";
            });


        } 
    };

    var url = "https://tads-trello.herokuapp.com/api/trello/boards/"+token+"/"+idQuadro;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

   


}else{
    //redir login
    
}

//cria uma nova lista 
function criarLista(idLista, nomeLista){
    //botão para excluir uma lista
    var botaoExcluir = document.createElement("span")
    botaoExcluir.setAttribute("class", "botao_excluir");
    botaoExcluir.innerHTML="X";
    
    
    if(idLista == undefined){
        var lista = document.createElement("div");
        lista.setAttribute("class", "col-md-2");
        lista.style.background="#D8D8D8";
        lista.style.marginLeft="0.4%";
        lista.style.marginTop="0.4%";
        
        quadro.appendChild(lista);
        

        var tituloLista = document.createElement("input");
        tituloLista.setAttribute("required", "required");
        tituloLista.setAttribute("type", "text");
        tituloLista.style.width="80%";
        lista.appendChild(tituloLista);

        var botaoCadastrarLista = document.createElement("input");
        botaoCadastrarLista.setAttribute("type", "button");
        botaoCadastrarLista.setAttribute("class", "btn btn-success btn-sm");
        botaoCadastrarLista.value="Adicionar Lista";
        lista.appendChild(botaoCadastrarLista);

        var botaoFechar = document.createElement("span")
        botaoFechar.setAttribute("class", "botao_fechar");
        botaoFechar.innerHTML="X";
        lista.appendChild(botaoFechar);



        //"botão cadastrar" adiciona a lista e cria uma nova lista.
        botaoCadastrarLista.addEventListener("click", function(e){
            /** requisição de cadastro de lista **/
            var dados = {
                name: tituloLista.value,
                token: token,
                board_id: idQuadro
            };
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var obj = JSON.parse(this.responseText);
                    lista.setAttribute("id_lista", obj.id);
                } 
            };
            var url = "https://tads-trello.herokuapp.com/api/trello/lists/new";
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(dados));   

            //Acrescenta o botão de exclusão
            lista.appendChild(botaoExcluir);
            botaoExcluir.addEventListener("click", function(e){
            excluirLista(lista.getAttribute("id_lista"));
            quadro.removeChild(lista);
            });

            //botão para adicionar um novo cartão
            var botaoAdicionarNovoCartao = document.createElement("input");
            botaoAdicionarNovoCartao.setAttribute("type", "button");
            botaoAdicionarNovoCartao.setAttribute("class", "btn btn-dark btn-sm");
            botaoAdicionarNovoCartao.value="Novo cartão";
            lista.appendChild(botaoAdicionarNovoCartao);

            botaoAdicionarNovoCartao.addEventListener("click", function(e){
                e.preventDefault();
                this.style.display="none";
                criarCartao(lista.ATTRIBUTE_NODE("id_lista").value, botaoAdicionarNovoCartao);
            });

            //Exclusão do botão "fechar", pois a lista já foi criada
            lista.removeChild(botaoFechar);

            //Exclisao do botão "cadastrar lista", pois a lista já foi cadastrada
            lista.removeChild(botaoCadastrarLista);
            
            criarLista();
        });

        //botao "fechar" remove a lista e exibe o botão de criar nova lista.
        botaoFechar.addEventListener("click", function(e){
            quadro.removeChild(lista);
            quadro.appendChild(botaoAdicionarLista); //atualiza  a posição do botão
            botaoAdicionarLista.style.display="block";
        });
    }else{
        var lista = document.createElement("div");
        lista.setAttribute("class", "col-md-2");
        lista.setAttribute("id", idLista);
        lista.style.background="#D8D8D8";
        lista.style.marginLeft="0.4%";
        lista.style.marginTop="0.4%";
        
        quadro.appendChild(lista);
        
        var tituloLista = document.createElement("input");
        tituloLista.setAttribute("required", "required");
        tituloLista.setAttribute("type", "text");
        tituloLista.setAttribute("value", nomeLista);
        tituloLista.style.width="80%";
        lista.appendChild(tituloLista);

        lista.appendChild(botaoExcluir);

        botaoExcluir.addEventListener("click", function(e){
            excluirLista(idLista);
            quadro.removeChild(lista);
        });
        //botão para adicionar um novo cartão
        var botaoAdicionarNovoCartao = document.createElement("input");
        botaoAdicionarNovoCartao.setAttribute("type", "button");
        botaoAdicionarNovoCartao.setAttribute("class", "btn btn-dark btn-sm");
        botaoAdicionarNovoCartao.value="Novo cartão";
        lista.appendChild(botaoAdicionarNovoCartao);

        
        botaoAdicionarNovoCartao.addEventListener("click", function(e){
            e.preventDefault();
            this.style.display="none";
            criarCartao(idLista, botaoAdicionarNovoCartao);
        });
     
    }

}

//Cria um novo cartão
function criarCartao(idLista, botaoNovo){
    //{ "name": "Card 1", "data": "dd/mm/yyyy", "token": "PAposhSCEzRouxtck6rgsP", "list_id": "1", }
    //cartão e seus elementos
    var lista = document.getElementById(idLista);
    var cartao = document.createElement("div");
    var tituloCartao = document.createElement("textarea");

    var botaoAdicionarCartao = document.createElement("input");
    botaoAdicionarCartao.setAttribute("type", "button");
    botaoAdicionarCartao.setAttribute("class", "btn btn-success btn-sm");
    botaoAdicionarCartao.value="Adicionar Cartão";

    var botaoFechar = document.createElement("span")
    botaoFechar.setAttribute("class", "botao_fechar");
    botaoFechar.innerHTML="X";
    
    //adicionando elementos ao cartão e depois adicionando o cartão à lista
    cartao.appendChild(tituloCartao);
    cartao.appendChild(botaoAdicionarCartao);
    cartao.appendChild(botaoFechar);
    lista.appendChild(cartao);

    botaoFechar.addEventListener("click", function(e){
        e.preventDefault();
        lista.removeChild(cartao);
        botaoNovo.style.display="block" 
    });
   
    //criação de uma div que representa a tag (que é um dropdown com opções de cores)
    var tag = document.createElement("div");
    tag.setAttribute("class", "btn-group");
    var botao = document.createElement("button");
    botao.setAttribute("class", "btn btn-secondary btn-sm dropdown-toggle");
    botao.setAttribute("type", "button");
    botao.setAttribute("data-toggle", "dropdown");
    botao.setAttribute("aria-haspopup", "true");
    botao.setAttribute("aria-expanded", "false");
    var divDropDown = document.createElement("div");
    divDropDown.setAttribute("class", "dropdown-menu");
    tag.appendChild(botao);
    tag.appendChild(divDropDown);

    var listaCores = document.createElement("ul");
    var cores = [];
    for(var i=0;i<6;i++){
        cores[i] = document.createElement("li");
        var cor = document.createElement("button");
        cor.setAttribute("class", "btn btn-primary");
        cores[i].appendChild(cor);
        listaCores.appendChild(cores[i]);
    }
    divDropDown.appendChild(listaCores);
    cartao.appendChild(tag);
    /* 
    <span class="icon-sm icon-check card-label-selectable-icon light"></span>

    <div class="btn-group">
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Small button
        </button>
        <div class="dropdown-menu">
            ...
        </div>
    </div>

    <span class="card-label mod-selectable card-label-green  js-select-label selected" data-idlabel="5ce5547e91d0c2ddc5460d36" data-color="green"><span class="icon-sm icon-check card-label-selectable-icon light"></span></span>
    */
    
    


}

//Faz requisição das listas associadas ao quadro
function listarListas(){
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var listas = JSON.parse(this.responseText);
            var idLista;
            var nomeLista;
            
            for(var i=0; i<listas.length;i++){
                idLista = listas[i].id;
                nomeLista = listas[i].name;
                criarLista(idLista, nomeLista);
            }
        } 
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/lists/"+token+"/board/"+idQuadro;
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();  
}

//Exclui lista com id passado como parâmetro
function excluirLista(idLista){
    var xhttp = new XMLHttpRequest();

    var dados = {
        list_id: idLista,
        token: token
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        } 
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/lists/delete";
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));   

}