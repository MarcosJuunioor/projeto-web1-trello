var token = sessionStorage.getItem("token");
var idQuadro = sessionStorage.getItem("id_quadro");

var quadro = document.getElementById("id_quadro");

if(token){//permanece na página
    criarModalCartao();

    var body = document.getElementById("id_body");
    var nomeQuadro;
    var corQuadro;
    var cabecalho = document.getElementById("id_cabecalho");
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
            titulo.style.marginLeft="2%";
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
    window.location.href = "index.html";
}

//cria uma nova lista 
function criarLista(idLista, nomeLista){
    //botão para excluir uma lista
    var botaoExcluir = document.createElement("img")
    botaoExcluir.setAttribute("src", "https://img.icons8.com/ios/50/000000/empty-trash-filled.png");
    botaoExcluir.setAttribute("class", "botao_excluir");
    botaoExcluir.style.margin="1% 1% 1% 1%";
    
    var divLista = document.createElement("div");
    divLista.setAttribute("class", "col-md-2");
    divLista.style.padding="3px";
    

    if(idLista == undefined){
        
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

            tituloLista.addEventListener("blur", function(e){
                e.preventDefault();
                renomearLista(lista.id, tituloLista.value);
            });

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

            /* Events fired on the drop target */
            lista.addEventListener("dragover", function(event) {
                event.preventDefault();
            });
        
            lista.addEventListener("drop", function(event) {
                event.preventDefault();
                var idCartao = event.dataTransfer.getData("Text");
                lista.removeChild(botaoAdicionarNovoCartao);
                lista.appendChild(document.getElementById("id_cartao"+idCartao));
                lista.appendChild(botaoAdicionarNovoCartao);
                alterarCartaoDeLista(idCartao, lista.id);
                
            });
        });

        //botao "fechar" remove a lista e exibe o botão de criar nova lista.
        botaoFechar.addEventListener("click", function(e){
            quadro.removeChild(divLista);
            quadro.appendChild(botaoAdicionarLista); //atualiza  a posição do botão
            botaoAdicionarLista.style.display="block";
        });
    }else{
        
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

        tituloLista.addEventListener("blur", function(e){
            e.preventDefault();
            renomearLista(idLista, tituloLista.value);
        });

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

        /* Events fired on the drop target */
        lista.addEventListener("dragover", function(event) {
            event.preventDefault();
        });
        
        lista.addEventListener("drop", function(event) {
            event.preventDefault();
            var idCartao = event.dataTransfer.getData("Text");
            lista.removeChild(botaoAdicionarNovoCartao);
            lista.appendChild(document.getElementById("id_cartao"+idCartao));
            lista.appendChild(botaoAdicionarNovoCartao);
            alterarCartaoDeLista(idCartao, lista.id);
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

//renomeia lista
function renomearLista(idLista, novoNome){
    var xhttp = new XMLHttpRequest();

    var dados = {
        list_id: idLista,
        name: novoNome,
        token: token
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {} 
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/lists/rename";
    xhttp.open("PATCH", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));   

}

//Exclui lista com id passado como parâmetro
function excluirLista(idLista){
    var xhttp = new XMLHttpRequest();

    var dados = {
        list_id: idLista,
        token: token
    };

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {} 
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/lists/delete";
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));   

}



//Cria um novo cartão 
function criarCartao(idLista, botaoNovo, idCartao, nomeCartao){
    //cartão 
    var lista = document.getElementById(idLista);
    var cartao = document.createElement("div");
    cartao.setAttribute("class", "cartao");
    cartao.setAttribute("draggable", "true");


    if(idCartao == undefined){
        //elementos do cartão
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
        

        //definição da data de cadastro do cartão
        var dataCadastro = new Date();
        var dd = String(dataCadastro.getDate()).padStart(2, '0');
        var mm = String(dataCadastro.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = dataCadastro.getFullYear();
        
        dataCadastro = mm + '/' + dd + '/' + yyyy;

        //ao clicar no botão "adic cartão", será feita uma requisição para cadastro de um cartão com os dados nome, data, token e id da lista.
        botaoAdicionarCartao.addEventListener("click", function(e){
            e.preventDefault();
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

            var idCartao = cartaoRetornoServ.id;
            cartao.setAttribute("id", "id_cartao"+idCartao);
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

            //ao clicar no título, o modal com o form do cartão é aberto
            spanTituloCartao.addEventListener("click", function(e){
                e.preventDefault();
                sessionStorage.setItem("idCartao", idCartao);
            
                // Modal responsável por comportar um formulário usado para exibição/edição dos dados do cartão.    
                var modalCartao = document.getElementById("id_modal_cartao");
                modalCartao.style.display="block";  
                preencherFormCartao(idCartao);

                //botao presente no formulário de dados do cartão que, quando pressionado, chama o método responsável por fazer uma requisição de cadastro de comentário para o cartão.
                var botaoSalvarComentario = document.getElementById("id_botao_salvar_comentario_cartao");
                botaoSalvarComentario.addEventListener("click", function(e){
                    e.preventDefault();
                    var comentario = document.getElementById("id_comentario_cartao_form").value;
                    adicionarComentario(idCartao, comentario);
                    var formCartao = document.getElementById("id_form_cartao");
                    if(document.getElementById("id_div_comentarios") != undefined){
                        formCartao.removeChild(document.getElementById("id_div_comentarios"));
                    }
                    listarComentariosCartao(idCartao);
                    
                });
                
                //fecha modal ao clicar fora
                window.onclick = function(event) {
                    if (event.target == modalCartao) {
                        quadro.removeChild(modalCartao);
                        criarModalCartao(idCartao);
                    }
                }

                //fecha modal ao clicar no botão fechar
                var spanFechaModal = document.getElementsByClassName("close_modal_cartao")[0];
                spanFechaModal.onclick = function() {
                    quadro.removeChild(modalCartao);
                    criarModalCartao(idCartao);
                }
                //ao clicar fora do título, uma requisição de alteração do nome do cartão será feita, e o mesmo será alterado.
                var tituloCartaoForm = document.getElementById("id_titulo_cartao_form");
                tituloCartaoForm.addEventListener("blur", function(e){
                    renomearCartao(idCartao, tituloCartaoForm.value);
                    //atualização do título do spanTituloCartão (para exibição ao usuário)
                    spanTituloCartao.innerHTML=tituloCartaoForm.value;
                }); 

                var botaoExcluirCartao = document.getElementById("id_botao_excluir_cartao");
                botaoExcluirCartao.addEventListener("click", function(e){
                    lista.removeChild(cartao);
                    quadro.removeChild(modalCartao);
                    excluirCartao(idCartao);
                });
            });    
            /* Events fired on the drag target */
            cartao.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("Text", idCartao);
            });
            
            cartao.addEventListener("dragend", function(event) {
                //document.getElementById("demo").innerHTML = "Finished dragging the p element.";
            });
           
        });


        /*
        o que se pode fazer com um card:
        - renomear (ok)
        - alterar a data
        - alterar um card de list (passar de uma lista para outra) (OK)
        - excluir (ok)
        - adicionar uma tag
        - adicionar um comentário (ok)
        - listar os comentários (ok)
        - listar as tags
        */


    }else{
            cartao.setAttribute("id", "id_cartao"+idCartao);
            //Span para exibir título do cartão
            var spanTituloCartao = document.createElement("span");
            spanTituloCartao.setAttribute("class","span_titulo_cartao");
            spanTituloCartao.innerHTML=nomeCartao;
            cartao.appendChild(spanTituloCartao);
            lista.appendChild(cartao);
            listarTags(idCartao, cartao);

            cartao.style.borderBottom="1px solid grey";
            cartao.style.borderRadius="5px";
            cartao.style.background="white";
            
            //ao clicar no cartão, um  modal com o form do cartão é aberto
            cartao.addEventListener("click", function(e){
                e.preventDefault();
                sessionStorage.setItem("idCartao", idCartao);
                
                // Modal responsável por comportar um formulário usado para exibição/edição dos dados do cartão.    
                var modalCartao = document.getElementById("id_modal_cartao");
                modalCartao.style.display="block";  
                preencherFormCartao(idCartao);

                //botao presente no formulário de dados do cartão que, quando pressionado, chama o método responsável por fazer uma requisição de cadastro de comentário para o cartão.
                var botaoSalvarComentario = document.getElementById("id_botao_salvar_comentario_cartao");
                botaoSalvarComentario.addEventListener("click", function(e){
                    e.preventDefault();
                    var comentario = document.getElementById("id_comentario_cartao_form").value;
                    adicionarComentario(idCartao, comentario);
                    var formCartao = document.getElementById("id_form_cartao");
                    if(document.getElementById("id_div_comentarios") != undefined){
                        formCartao.removeChild(document.getElementById("id_div_comentarios"));
                    }
                    listarComentariosCartao(idCartao);
                });

                //fecha modal ao clicar fora
                window.onclick = function(event) {
                    if (event.target == modalCartao) { 
                        quadro.removeChild(modalCartao);
                        criarModalCartao(idCartao);
                    }
                }

                //fecha modal ao clicar no botão fechar
                var spanFechaModal = document.getElementsByClassName("close_modal_cartao")[0];
                spanFechaModal.onclick = function() {
                    quadro.removeChild(modalCartao);
                    criarModalCartao(idCartao);

                }
                //ao clicar fora do título, uma requisição de alteração do nome do cartão será feita, e o mesmo será alterado.
                var tituloCartaoForm = document.getElementById("id_titulo_cartao_form");
                tituloCartaoForm.addEventListener("blur", function(e){
                    renomearCartao(idCartao, tituloCartaoForm.value);
                    //atualização do título do spanTituloCartão (para exibição ao usuário)
                    spanTituloCartao.innerHTML=tituloCartaoForm.value;
                }); 

                var botaoExcluirCartao = document.getElementById("id_botao_excluir_cartao");
                botaoExcluirCartao.addEventListener("click", function(e){
                    lista.removeChild(cartao);
                    quadro.removeChild(modalCartao);
                    excluirCartao(idCartao);
                });

            });
            /* Events fired on the drag target */
            cartao.addEventListener("dragstart", function(event) {
                event.dataTransfer.setData("Text", idCartao);
            });
            
            cartao.addEventListener("dragend", function(event) {
                //document.getElementById("demo").innerHTML = "Finished dragging the p element.";
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

//função responsável por preencher um form associado a um cartão com os dados dete.
function preencherFormCartao(idCartao){
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
            var cartao = JSON.parse(this.responseText);
            //título
            var tituloCartao = document.getElementById("id_titulo_cartao_form");
            tituloCartao.value = cartao.name;        
            //comentários
            listarComentariosCartao(idCartao);
            
        } 
    };
        
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/"+token+"/"+idCartao;
    xhttp.open("get", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

//função responsável por adicionar um comentário ao cartão
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

//função responsável por lsitar todos os comentários de um determinado cartão
function listarComentariosCartao(idCartao){
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
            var comentarios = JSON.parse(this.responseText);
            if(comentarios[0]!=undefined){
                //elementos dos comentários são adicionados ao form do cartão
                var formCartao = document.getElementById("id_form_cartao");
                var divComentarios = document.createElement("div");
                divComentarios.setAttribute("id", "id_div_comentarios");
                var labelComentarios = document.createElement("label");
                labelComentarios.setAttribute("for", "id_div_comentarios");
                labelComentarios.innerHTML="Comentários";
                divComentarios.appendChild(labelComentarios);
                formCartao.appendChild(divComentarios);

                //criação de parágrafos para colocar cada um dos comentários iterativamente
                for(var i=0; i<comentarios.length;i++){
                    var comentario = document.createElement("p");
                    comentario.setAttribute("class", "comentario");
                    comentario.innerHTML=comentarios[i].comment;
                    divComentarios.appendChild(comentario);

                }     
            }
        } 
    };
        
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/"+token+"/"+idCartao+"/comments";
    xhttp.open("get", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

//renomeia um cartão por meio de requisição patch
function renomearCartao(idCartao, novoNome){
    var dados = {
        token: token,
        card_id: idCartao,
        name: novoNome
    };

    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {} 
    };
        
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/rename";
    xhttp.open("PATCH", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));
}
// função responsável por fazer requisição delete para excluir cartão
function excluirCartao(idCartao){
    var dados = {
        token: token,
        card_id: idCartao,
    };

    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
            
        } 
    };
        
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/delete";
    xhttp.open("DELETE", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));

}


//Faz requisição para mudar a lista a que pertence um determinado cartão
function alterarCartaoDeLista(idCartao, idLista){
    var dados = {
        token: token,
        card_id: idCartao,
        list_id: idLista
    };

    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {} 
    };
        
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/changelist";
    xhttp.open("PATCH", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));

}

//Faz requisição para adicionar uma tag a um cartão
function adicionarTag(idCartao, idTag){
        var cartao = document.getElementById("id_cartao"+idCartao);
        var dados = {
            card_id: idCartao,
            tag_id: idTag,
            token: token
        };
    
        var xhttp = new XMLHttpRequest(); 
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {          
                
                    var tag = document.createElement("button");
                    tag.style.margin="1%";
                    if(idTag == 2){
                        tag.setAttribute("class", "btn btn-primary");
                    }else if(idTag == 12){
                        tag.setAttribute("class", "btn btn-success");
                    }else if(idTag == 22){
                        tag.setAttribute("class", "btn btn-danger");
                    }else if(idTag == 32){
                        tag.setAttribute("class", "btn btn-warning");
                    }
                    
                    cartao.appendChild(tag);
                
            } else if (this.readyState == 4 && this.status == 400) {          
                alert("Essa tag já foi adicionada!");
            }
        };
            
        var url = "https://tads-trello.herokuapp.com/api/trello/cards/addtag";
        xhttp.open("POST", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(dados));

}

//Faz requisição para listar tags de um determinado cartão
function listarTags(idCartao, cartao){

    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {    

            var tags = JSON.parse(this.responseText);
            for(var i=0; i<tags.length; i++){
                var tag = document.createElement("button");
                tag.style.margin="1%";
                if(tags[i].id == 2){
                    tag.setAttribute("class", "btn btn-primary "+"tags_cartao"+cartao.id);
                }else if(tags[i].id == 12){
                    tag.setAttribute("class", "btn btn-success "+"tags_cartao"+cartao.id);
                }else if(tags[i].id == 22){
                    tag.setAttribute("class", "btn btn-danger "+"tags_cartao"+cartao.id);
                }else if(tags[i].id == 32){
                    tag.setAttribute("class", "btn btn-warning "+"tags_cartao"+cartao.id);
                }
                
                cartao.appendChild(tag);
            }

        } 
    };
        
    var url = "https://tads-trello.herokuapp.com/api/trello/cards/"+token+"/"+idCartao+"/tags";
    xhttp.open("GET", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

    
//função responsável por criar o modal dos cartões, para exibição do form
function criarModalCartao(idCartao){

    var modalCartao = document.createElement("div");
    modalCartao.setAttribute("class", "modal_cartao");
    modalCartao.setAttribute("id", "id_modal_cartao");

    var conteudoModalCartao = document.createElement("div");
    conteudoModalCartao.setAttribute("class", "conteudo_modal_cartao");
    modalCartao.appendChild(conteudoModalCartao);

    var spanCloseModal = document.createElement("span");
    spanCloseModal.setAttribute("class", "close_modal_cartao");
    spanCloseModal.innerHTML="&times;";
    conteudoModalCartao.appendChild(spanCloseModal);

    var formCartao = document.createElement("form");
    formCartao.setAttribute("id", "id_form_cartao");
    conteudoModalCartao.appendChild(formCartao);

    var divTitulo = document.createElement("div");
    divTitulo.setAttribute("class", "form-group");
    var inputTitulo = document.createElement("input");
    inputTitulo.setAttribute("type", "text");
    inputTitulo.setAttribute("class", "form-control");
    inputTitulo.setAttribute("id", "id_titulo_cartao_form");    
    inputTitulo.setAttribute("placeholder", "Título do cartão..."); 
    var labelTitulo = document.createElement("label");
    labelTitulo.setAttribute("for", "id_titulo_cartao_form"); 
    labelTitulo.innerHTML="Título";
    divTitulo.appendChild(labelTitulo); 
    divTitulo.appendChild(inputTitulo); 
    formCartao.appendChild(divTitulo); 

    var divComentario = document.createElement("div");
    divComentario.setAttribute("class", "form-group");
    var textComentario = document.createElement("textarea");
    textComentario.setAttribute("class", "form-control");
    textComentario.setAttribute("id", "id_comentario_cartao_form");    
    textComentario.setAttribute("rows", 3);  
    var labelComentario = document.createElement("label");
    labelComentario.setAttribute("for", "id_comentario_cartao_form");
    labelComentario.innerHTML="Comentário";
    divComentario.appendChild(labelComentario); 
    divComentario.appendChild(textComentario); 
    formCartao.appendChild(divComentario);

    var divBotaoSalvar = document.createElement("div");
    divBotaoSalvar.setAttribute("class", "form-group");
    var botaoSalvar = document.createElement("input");
    botaoSalvar.setAttribute("id", "id_botao_salvar_comentario_cartao");
    botaoSalvar.setAttribute("class", "btn btn-success btn-sm");    
    botaoSalvar.setAttribute("type", "button");    
    botaoSalvar.setAttribute("value", "Salvar");  
    divBotaoSalvar.appendChild(botaoSalvar); 
    formCartao.appendChild(divBotaoSalvar);

    var divBotaoExcluir = document.createElement("div");
    divBotaoExcluir.setAttribute("class", "form-group");
    var botaoExcluir = document.createElement("input");
    botaoExcluir.setAttribute("id", "id_botao_excluir_cartao");
    botaoExcluir.setAttribute("class", "btn btn-danger btn-sm");    
    botaoExcluir.setAttribute("type", "button");    
    botaoExcluir.setAttribute("value", "Excluir");  
    divBotaoExcluir.appendChild(botaoExcluir); 
    formCartao.appendChild(divBotaoExcluir);

    var divComboBox = document.createElement("div");
    divComboBox.setAttribute("class", "btn-group");

    var botaoTags = document.createElement("input");
    botaoTags.setAttribute("class", "btn btn-warning btn-sm dropdown-toggle");
    botaoTags.setAttribute("type", "button");
    botaoTags.setAttribute("data-toggle", "dropdown");
    botaoTags.setAttribute("aria-haspopup", "true");
    botaoTags.setAttribute("aria-expande", "false");
    botaoTags.value="Tags";

    var divTags = document.createElement("div");
    divTags.setAttribute("class", "dropdown-menu");
    divTags.setAttribute("id", "id_tags_cartao");
    divComboBox.appendChild(botaoTags);
    divComboBox.appendChild(divTags);
    formCartao.appendChild(divComboBox);
    
    var cores = ["blue", "green", "red", "yellow"];
    for(var i=0; i<cores.length; i++){
      var tag = document.createElement("button");
      tag.setAttribute("class", "dropdown-item botoes_tag");
      tag.setAttribute("id", "id_tag"+i);
      tag.style.background=cores[i];
      tag.addEventListener("click", function(e){
        e.preventDefault();
        if(this.id=="id_tag0"){
            idCartao = sessionStorage.getItem("idCartao");
            adicionarTag(idCartao, 2);
        }
        if(this.id=="id_tag1"){
            idCartao = sessionStorage.getItem("idCartao");
            adicionarTag(idCartao, 12);
        }
        if(this.id=="id_tag2"){
            idCartao = sessionStorage.getItem("idCartao");
            adicionarTag(idCartao, 22);
        }
        if(this.id=="id_tag3"){
            idCartao = sessionStorage.getItem("idCartao");
            adicionarTag(idCartao, 32);
        }
      });

      divTags.appendChild(tag);
    }

    quadro.appendChild(modalCartao);
}

