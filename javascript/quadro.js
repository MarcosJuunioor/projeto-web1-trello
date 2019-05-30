//var token = sessionStorage.getItem("token");
//var idQuadro = sessionStorage.getItem("id_quadro");
console.log(token);
var token = "8vAu8jK6CvENKCrVHJkZ6f";
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
            botaoAdicionarLista.value="Adicionar outra lista";
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
    var botaoExcluir = document.createElement("span")
    botaoExcluir.setAttribute("id", "id_botao_excluir");
    botaoExcluir.innerHTML="X";
    
    
    if(idLista == undefined){
        var lista = document.createElement("div");
        lista.setAttribute("class", "col-sm-2");
        lista.style.background="#D8D8D8";
        lista.style.marginLeft="0.4%";
        lista.style.marginTop="0.4%";
        quadro.appendChild(lista);
        

        var tituloLista = document.createElement("input");
        tituloLista.setAttribute("required", "required");
        tituloLista.setAttribute("type", "text");
        lista.appendChild(tituloLista);

        var botaoCadastrarLista = document.createElement("input");
        botaoCadastrarLista.setAttribute("type", "button");
        botaoCadastrarLista.setAttribute("class", "btn btn-success btn-sm");
        botaoCadastrarLista.value="Adicionar Lista";
        lista.appendChild(botaoCadastrarLista);

        var botaoFechar = document.createElement("span")
        botaoFechar.setAttribute("id", "id_botao_fechar");
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
            botaoAdicionarNovoCartao.value="Adicionar cartão";
            lista.appendChild(botaoAdicionarNovoCartao);

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
        lista.setAttribute("class", "col-sm-2");
        lista.setAttribute("id", idLista);
        lista.style.background="#D8D8D8";
        lista.style.marginLeft="0.4%";
        lista.style.marginTop="0.4%";
        quadro.appendChild(lista);
        
        var tituloLista = document.createElement("input");
        tituloLista.setAttribute("required", "required");
        tituloLista.setAttribute("type", "text");
        tituloLista.setAttribute("value", nomeLista);
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
        botaoAdicionarNovoCartao.value="Adicionar cartão";
        lista.appendChild(botaoAdicionarNovoCartao);
     
    }

}

//Cria um novo cartão
function criarCartao(){
    var cartao = document.createElement("div");
    lista.appendChild(cartao);
    


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