    
    function criarFormCartao(){

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
        divTitulo.appendChild(labelTitulo); 
        divTitulo.appendChild(inputTitulo); 
        formCartao.appendChild(divTitulo); 

        var divComentario = document.createElement("div");
        divComentario.setAttribute("class", "form-group");
        var textComentario = document.createElement("input");
        textComentario.setAttribute("class", "form-control");
        textComentario.setAttribute("id", "id_comentario_cartao_form");    
        textComentario.setAttribute("rows", "3");  
        var labelComentario = document.createElement("label");
        labelComentario.setAttribute("for", "id_comentario_cartao_form");
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
        formCartao.appendChild(botaoSalvar);

        quadro.appendChild(modalCartao);


}