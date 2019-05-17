/* form cadastro */
var formCadastro = document.getElementById("id_form_cadastro");
var botaoVoltar = document.getElementById("id_botao_voltar");
var senha1 = document.getElementById("id_senha1");
var senha2 = document.getElementById("id_senha2");
formCadastro.style.display = "none";

/* form login */
var formLogin = document.getElementById("id_form_login");
var botaoCadastro = document.getElementById("id_botao_cadastro");


var mensagem = document.getElementById("id_mensagem");
mensagem.style.display = 'none';


botaoCadastro.addEventListener("click", function(e){
    e.preventDefault();
    formLogin.style.display = "none";
    formCadastro.style.display = "block";
});
botaoVoltar.addEventListener("click", function(e){
    e.preventDefault();
    mensagem.style.display = 'none';
    formCadastro.style.display = "none";
    formLogin.style.display = "block";
});

/* SUBMIT DO FORM DE LOGIN */
formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    var dados = {
        username: document.getElementById("id_nome_usuario_login").value,
        password: document.getElementById("id_senha_login").value
};

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.responseText);
            sessionStorage.setItem("token", resposta.token);
            mensagem.innerHTML = "Login efetuado com sucesso!";
        } else if (this.readyState == 4  && this.status == 400) {
            mensagem.innerHTML = "Verifique os dados!";
        } 
        console.log(this.readyState);
        console.log(this.status);
        mensagem.style.display = 'block';
    };
  //  var url = "http://www.henriquesantos.pro.br:8080/api/trello/login";
    var url = "http://192.168.120.202:8080/api/trello/login";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.send(JSON.stringify(dados));

});

/* SUBMIT DO FORM DE CADASTRO */
formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();
    mensagem.style.display = 'none';
    if(senha1.value == senha2.value){
        if(verificarSenha(senha1.value)){
            var dados = {
                name: document.getElementById("id_nome").value,
                username: document.getElementById("id_nome_usuario_cadastro").value,
                password: document.getElementById("id_senha1").value
            };
        
        
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    mensagem.innerHTML = "Usuário cadastrado com sucesso!";
                } 
                if (this.readyState == 4 && this.status ==400) {
                    mensagem.innerHTML = "Usuário não cadastrado, verifique o nome do usuário!";
                    console.log(this.status, this.responseText);
                } 
                mensagem.style.display = 'block';
            };
            //var url = " "; 
            var url = "http://192.168.120.202:8080/api/trello/users/new";
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/json");
        
            console.log(dados);
        
            xhttp.send(JSON.stringify(dados));            
        }else{
            alert("Senha inválida. A senha deve conter pelo menos um caractere maiúsculo, um número e apenas caracteres alfanuméricos (a-z, 0-9).");
        }
    }else{
        alert("Senhas diferentes!");
    }


});

function verificarSenha(senha){
   var naoTemCaractereAlfaNumerico = /[^a-z^1-9^A-Z]/.test(senha);
   var temMaiuscula = /[A-Z]/.test(senha);
   var temNumero = /[0-9]/.test(senha);
   return !(naoTemCaractereAlfaNumerico || !temMaiuscula || !temNumero);
}
// /[^a-z]/i caracteres q n estejam entre a e z.
// /[^0-9]/i caracteres q n estejam entre 0 e 9.
// /[0-9]/i caracteres q estejam entre 0 e 9.

