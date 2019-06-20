//var token = sessionStorage.getItem("token");
//var idQuadro = sessionStorage.getItem("id_quadro");
//console.log(idQuadro);
var token = "BqRdrBrv5vciKXuVPvpzfS";
var idQuadro = 2382;

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
    var botaoExcluir = document.createElement("img")
    botaoExcluir.setAttribute("src", "https://img.icons8.com/ios/50/000000/empty-trash-filled.png");
    botaoExcluir.setAttribute("class", "botao_excluir");
    botaoExcluir.style.margin="1% 1% 1% 1%";
    
    
    if(idLista == undefined){
        var divLista = document.createElement("div");
        divLista.setAttribute("class", "col-md-2");
        divLista.style.padding="3px";

        
        var lista = document.createElement("div");
        lista.setAttribute("class", "lista");
        lista.style.padding="3%";
        lista.style.borderRadius="5px";

        divLista.appendChild(lista);
        quadro.appendChild(divLista);
        

        var tituloLista = document.createElement("input");
        tituloLista.setAttribute("required", "required");
        tituloLista.setAttribute("type", "text");
        tituloLista.setAttribute("placeholder", "Digite um título...");
        tituloLista.style.width="96.5%";
        tituloLista.style.margin="2% 2% 2% 2%";
        lista.appendChild(tituloLista);

        var botaoCadastrarLista = document.createElement("input");
        botaoCadastrarLista.setAttribute("type", "button");
        botaoCadastrarLista.setAttribute("class", "btn btn-success btn-sm");
        botaoCadastrarLista.value="Adicionar Lista";
        botaoCadastrarLista.style.margin="2% 2% 2% 2%";
       // botaoCadastrarLista.style.position="relative";
        lista.appendChild(botaoCadastrarLista);

        var botaoFechar = document.createElement("input");
        botaoFechar.setAttribute("class", "botao_fechar btn btn-outline-danger btn-sm");
        botaoFechar.setAttribute("type", "button");
        botaoFechar.style.position="relative";
        botaoFechar.style.marginTop="0.5%";
        botaoFechar.setAttribute("value", "X");
        lista.appendChild(botaoFechar);



        //"botão cadastrar" adiciona a lista e cria uma nova lista.
        botaoCadastrarLista.addEventListener("click", function(e){
            this.disable="true";
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
                    lista.setAttribute("id", obj.id);
                } 
            };
            var url = "https://tads-trello.herokuapp.com/api/trello/lists/new";
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(dados));   

            //algumas configurações de css do título da lista são alteradas quando a lista é adicionada
            tituloLista.style.width="80%";
            tituloLista.style.background="transparent";
            tituloLista.style.border="none";
            tituloLista.style.fontWeight="bold";
            tituloLista.style.cursor="pointer";

            //Acrescenta o botão de exclusão
            lista.appendChild(botaoExcluir);
            botaoExcluir.addEventListener("click", function(e){
            excluirLista(lista.getAttribute("id"));
            quadro.removeChild(divLista);
            });

            //botão para adicionar um novo cartão
            var botaoAdicionarNovoCartao = document.createElement("input");
            botaoAdicionarNovoCartao.setAttribute("type", "button");
            botaoAdicionarNovoCartao.setAttribute("class", "btn btn-dark btn-sm");
            botaoAdicionarNovoCartao.setAttribute("id", "id_botao_novo_cartao"+idLista);
            botaoAdicionarNovoCartao.value="Novo cartão";
            botaoAdicionarNovoCartao.style.margin="2% 2% 2% 2%";
            listarCartoes(idLista);
            lista.appendChild(botaoAdicionarNovoCartao);

            botaoAdicionarNovoCartao.addEventListener("click", function(e){
                e.preventDefault();
                this.style.display="none";
                criarCartao(lista.getAttribute("id"), botaoAdicionarNovoCartao);
            });

            //Exclusão do botão "fechar", pois a lista já foi criada
            lista.removeChild(botaoFechar);

            //Exclisao do botão "cadastrar lista", pois a lista já foi cadastrada
            lista.removeChild(botaoCadastrarLista);
            
            criarLista();
        });

        //botao "fechar" remove a lista e exibe o botão de criar nova lista.
        botaoFechar.addEventListener("click", function(e){
            quadro.removeChild(divLista);
            quadro.appendChild(botaoAdicionarLista); //atualiza  a posição do botão
            botaoAdicionarLista.style.display="block";
        });
    }else{
        var divLista = document.createElement("div");
        divLista.setAttribute("class", "col-md-2");
        divLista.style.padding="3px";
        
        var lista = document.createElement("div");
        lista.setAttribute("class", "lista");
        lista.setAttribute("id", idLista);
        lista.style.padding="3%";
        lista.style.borderRadius="5px";

        divLista.appendChild(lista);
        quadro.appendChild(divLista);
        
        var tituloLista = document.createElement("input");
        tituloLista.setAttribute("required", "required");
        tituloLista.setAttribute("type", "text");
        tituloLista.setAttribute("value", nomeLista);
        tituloLista.style.margin="2% 2% 2% 2%";
        tituloLista.style.width="80%";
        tituloLista.style.background="transparent";
        tituloLista.style.border="none";
        tituloLista.style.fontWeight="bold";
        tituloLista.style.cursor="pointer";
        lista.appendChild(tituloLista);

        lista.appendChild(botaoExcluir);
        botaoExcluir.addEventListener("click", function(e){
            excluirLista(idLista);
            quadro.removeChild(divLista);
        });
        //botão para adicionar um novo cartão
        var botaoAdicionarNovoCartao = document.createElement("input");
        botaoAdicionarNovoCartao.setAttribute("type", "button");
        botaoAdicionarNovoCartao.setAttribute("class", "btn btn-dark btn-sm");
        botaoAdicionarNovoCartao.setAttribute("id", "id_botao_novo_cartao"+idLista);
        botaoAdicionarNovoCartao.style.margin="2% 2% 2% 2%";
        botaoAdicionarNovoCartao.value="Novo cartão";
        listarCartoes(idLista);
        lista.appendChild(botaoAdicionarNovoCartao);

        
        botaoAdicionarNovoCartao.addEventListener("click", function(e){
            e.preventDefault();
            this.style.display="none";
            criarCartao(idLista, botaoAdicionarNovoCartao);
        });
     
    }

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



//Cria um novo cartão 
function criarCartao(idLista, botaoNovo, idCartao, nomeCartao){

    if(nomeCartao == undefined){
        //cartão e seus elementos
        var lista = document.getElementById(idLista);
        var cartao = document.createElement("div");
        cartao.setAttribute("class", "cartao");

        var tituloCartao = document.createElement("textarea");
        tituloCartao.style.resize="none";
        tituloCartao.style.width="96%";
        tituloCartao.style.margin="2% 2% 0% 2%";

        var botaoAdicionarCartao = document.createElement("input");
        botaoAdicionarCartao.setAttribute("type", "button");
        botaoAdicionarCartao.setAttribute("class", "btn btn-success btn-sm");
        botaoAdicionarCartao.style.margin="2% 2% 2% 2%";
        botaoAdicionarCartao.value="Adicionar Cartão";

        var botaoFechar = document.createElement("input");
        botaoFechar.setAttribute("class", "botao_fechar btn btn-outline-danger btn-sm");
        botaoFechar.setAttribute("type", "button");
        botaoFechar.setAttribute("value", "X");
        botaoFechar.style.position="relative";
        botaoFechar.style.marginTop="0.5%";

        //adicionando elementos ao cartão e depois adicionando o cartão à lista
        cartao.appendChild(tituloCartao);
        cartao.appendChild(botaoAdicionarCartao);
        cartao.appendChild(botaoFechar);
        lista.appendChild(cartao);

        botaoFechar.addEventListener("click", function(e){
            e.preventDefault();
            lista.removeChild(cartao);        
            lista.appendChild(botaoNovo);
            botaoNovo.style.display="block" 
        });
        
        //criação de uma div que representa a tag (que é um dropdown com opções de cores)
        var tags = document.getElementsByClassName("botoes_tag");
        var cores = ["green", "yellow", "orange", "red", "purple", "blue"];
        for(var i=0; i<tags.length; i++){
            tags.item(i).style.background=cores[i];
        }

        //definição da data de cadastro do cartão
        var dataCadastro = new Date();
        var dd = String(dataCadastro.getDate()).padStart(2, '0');
        var mm = String(dataCadastro.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dataCadastro.getFullYear();
        
        dataCadastro = mm + '/' + dd + '/' + yyyy;

        //ao clicar no botão "adic cartão", será feita uma requisição para cadastro de um cartão com os dados nome, data, token e id da lista.
        botaoAdicionarCartao.addEventListener("click", function(e){
            lista.appendChild(botaoNovo);
            botaoNovo.style.display="block" 

            var dadosCartao = {
                name: tituloCartao.value,
                data: dataCadastro,
                token: token,
                list_id: idLista
            };

            var xhttp = new XMLHttpRequest();
            var cartaoRetornoServ;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {          
                    cartaoRetornoServ = JSON.parse(this.responseText); 
                } 
            };
            
            var url = "https://tads-trello.herokuapp.com/api/trello/cards/new";
            xhttp.open("post", url, false);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(dadosCartao)); 

            //Span para exibir título do cartão, pois não se usará um "textarea" para exibição
            var spanTituloCartao = document.createElement("span");
            spanTituloCartao.setAttribute("class","span_titulo_cartao");
            spanTituloCartao.innerHTML=tituloCartao.value;
            cartao.appendChild(spanTituloCartao);
            

            //Remoção dos elementos usados para adicionar um cartão, pois o cartão já foi adicionado neste ponto
            cartao.removeChild(botaoAdicionarCartao);
            cartao.removeChild(botaoFechar);
            cartao.removeChild(tituloCartao);
            cartao.style.borderBottom="1px solid grey";
            cartao.style.borderRadius="5px";
            cartao.style.background="white";

            // Modal responsável por comportar um formulário usado para exibição/edição dos dados do cartão.    
            var modalCartao = document.getElementById("id_modal_cartao");
            spanTituloCartao.addEventListener("click", function(e){
                preencherFormCartao(cartaoRetornoServ.id);
                modalCartao.style.display="block";
            });
            window.onclick = function(event) {
                if (event.target == modalCartao) {
                    modalCartao.style.display = "none";
                }
            }
            var spanFechaModal = document.getElementsByClassName("close_modal_cartao")[0];
            spanFechaModal.onclick = function() {
                modalCartao.style.display = "none";
            }
            
        });




        /*
        o que se pode fazer com um card:
        - renomear 
        - alterar a data
        - alterar um card de list (passar de uma lista para outra)
        - excluir
        - adicionar uma tag
        - adicionar um comentário 
        - listar os comentários
        - listar as tags
        */


    }else{
            //cartão e seus elementos
            var lista = document.getElementById(idLista);
            var cartao = document.createElement("div");
            cartao.setAttribute("class", "cartao");

            //Span para exibir título do cartão
            var spanTituloCartao = document.createElement("span");
            spanTituloCartao.setAttribute("class","span_titulo_cartao");
            spanTituloCartao.innerHTML=nomeCartao;
            cartao.appendChild(spanTituloCartao);
            lista.appendChild(cartao);

            cartao.style.borderBottom="1px solid grey";
            cartao.style.borderRadius="5px";
            cartao.style.background="white";
            
            // Modal responsável por comportar um formulário usado para exibição/edição dos dados do cartão.    
            var modalCartao = document.getElementById("id_modal_cartao");
            spanTituloCartao.addEventListener("click", function(e){
                preencherFormCartao(idCartao);
                modalCartao.style.display="block";  
            });
            window.onclick = function(event) {
                if (event.target == modalCartao) {
                    modalCartao.style.display = "none";
                }
            }
            var spanFechaModal = document.getElementsByClassName("close_modal_cartao")[0];
            spanFechaModal.onclick = function() {
                modalCartao.style.display = "none";
            }

            //botao presente no formulário de dados do cartão que, quando pressionado, chama o método responsável por fazer uma requisição de cadastro de comentário para o cartão.
            var botaoSalvarComentario = document.getElementById("id_botao_salvar_comentario_cartao");
            botaoSalvarComentario.addEventListener("click", function(e){
                e.preventDefault();
                var comentario = document.getElementById("id_comentario_cartao_form").value;
                console.log("teste");
                //adicionarComentario(idCartao, comentario);
            });

    }




}

//lista os cartões associados a uma lista específica
function listarCartoes(idLista){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
            var cartoes = JSON.parse(this.responseText);
            var botaoAdicionarNovoCartao = document.getElementById("id_botao_novo_cartao"+idLista);
            
            for(var i=0;i<cartoes.length;i++){
                criarCartao(idLista, botaoAdicionarNovoCartao, cartoes[i].id, cartoes[i].name);
            }
        } 
    };
        
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/"+token+"/list/"+idLista;
    xhttp.open("get", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function preencherFormCartao(idCartao){
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
            var cartao = JSON.parse(this.responseText);

            var tituloCartao = document.getElementById("id_titulo_cartao_form");
            tituloCartao.value = cartao.name;        
        } 
    };
        
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/"+token+"/"+idCartao;
    xhttp.open("get", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function adicionarComentario(idCartao, comentario){
    var dados = {
        card_id: idCartao,
        comment: comentario,
        token: token
    };

    var xhttp = new XMLHttpRequest(); 

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {} 
    };
        
    var url = " https://tads-trello.herokuapp.com/api/trello/cards/addcomment";
    xhttp.open("post", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));

}

function renomearCartao(){}
function alterarDataCartao(){}
function adicionarTag(){}
function excluirCartao(){}
function alterarCartaoDeLista(){}