# Sistema de Gerenciamento de Projetos Similar ao Trello

Neste projeto, foi desenvolvido um sistema semelhante ao Trello, onde, basicamente, o usuário consegue organizar tarefas por meio da criação de quadros e listas. O Trello utiliza o paradigma Kanban para gerenciamento de projetos, que se tornou popular ao ser utilizado pela Toyota.

## Funcionamento
Para se criar um quadro, é necessário definir o seu título e cor de background. Depois disso, as listas podem ser adicionadas ao mesmo. Uma lista deve possuir um título e pode conter cartões. Estes, por sua vez, devem ter título e podem ter tags e comentários. Além disso, os cartões podem ser transferidos entre listas dinamicamente, por meio de drag-and-drop. 


## Ferramentas de Desenvolvimento
O front-end do sistema foi feito em HTML5, CSS3, Bootstrap e JS.Também foram usadas ferramentas como o Visual Studio Code e o Git. Todas as requisições à API foram feitas por meio de XMLHttpRequest.

## Documentação da API
A API e sua respectiva documentação foram desenvolvidas pelo Professor Henrique Santos, que leciona atualmente no IFPE. A documentação está disponível no site do professor e o direito autoral pertence a ele. Segue o site: http://www.henriquesantos.pro.br/p/bem-vindo.html. 

### Métodos - Usuários
#### Cadastrar um usuario
Passar por POST o JSON:

{ "name":"nome", "username":"username", "password": "senha" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/users/new

Obs: O username não pode ser repetido!

#### Fazer Login
Passar por POST o JSON:

{ "username":"username", "password": "senha" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/login

Será retornado um JSON no formato abaixo:

{ "token": "AG5VZmKJ8Bm41xFzujC3ZV" }

Esse token deve ser armazenado para futuras chamados aos próximos métodos!

#### Lista de usuarios
Chamar por GET o endereço:

https://tads-trello.herokuapp.com/api/trello/users

Obs: A senha e o token não são omitidos nessa consulta! A finalidade é facilitar a verificação de criação de usuários!

#### Recuperar Usuário pelo token
Chamar por GET o endereço:

https://tads-trello.herokuapp.com/api/trello/users/:token

Obs: Substituir :token pelo token criado no login! A senha e o token são omitidos nessa consulta!


### Métodos - Boards
#### Cadastrar um board
Passar por POST o JSON:

{ "name":"board name", "color":"cor", "token":"AG5VZmKJ8Bm41xFzujC3ZV" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/boards/new

#### Lista de Boards criado pelo usuário
Chamar por GET o endereço:

https://tads-trello.herokuapp.com/api/trello/boards/:token

Obs: Substituir :token pelo token criado no login!

#### Recuperar um Board específico
Chamar por GET o endereço:

https://tads-trello.herokuapp.com/api/trello/boards/:token/:board_id

Obs: Substituir :token pelo token criado no login!

#### Renomear um board
Passar por PATCH o JSON:

{ "board_id": "2", "name": "new board 2.3", "token": "U6nmRB489Wa7UDVJ7bfxY3" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/boards/rename

#### Alterar a cor de um board
Passar por PATCH o JSON:

{ "board_id": "2", "color": "nova cor", "token": "U6nmRB489Wa7UDVJ7bfxY3" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/boards/newcolor

#### Excluir um board
Passar por DELETE o JSON:

{ "board_id": "2", "token": "U6nmRB489Wa7UDVJ7bfxY3" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/boards/delete

ATENÇÃO: A exclusão é em cascata, excluir o board irá excluir suas listas e cards!!!


### Métodos - Lists
#### Cadastrar um list
Passar por POST o JSON:

{ "name": "list 1", "token": "5dHsKtYyfvWdcwPYhHtLQ6", "board_id": "1" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/lists/new

#### Recuperar um List específico
Chamar por GET o endereço:

https://tads-trello.herokuapp.com/api/trello/lists/:token/:list_id

Obs: Substituir :token pelo token criado no login!

#### Lista de Lists de um Board
Chamar por GET o endereço:

Para o endereço: https://tads-trello.herokuapp.com/api/trello/lists/:token/board/:board_id

#### Renomear um List
Passar por PATCH o JSON:

{ "list_id": "2", "name": "new list 2.3", "token": "U6nmRB489Wa7UDVJ7bfxY3" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/lists/rename

#### Excluir um list
Passar por DELETE o JSON:

{ "list_id": "3", "token": "YJ6eygmYhAVWsqX2MqFD2p" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/lists/delete

ATENÇÃO: A exclusão é em cascata, excluir a lista irá excluir seus cards!!!


### Métodos - Cards
#### Cadastrar um Card
Passar por POST o JSON:

{ "name": "Card 1", "data": "dd/mm/yyyy", "token": "PAposhSCEzRouxtck6rgsP", "list_id": "1", }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/new

#### Recuperar um Card específico
Chamar por GET o endereço:

https://tads-trello.herokuapp.com/api/trello/cards/:token/:card_id

Obs: Substituir :token pelo token criado no login!

#### Lista de Cards de um List
Chamar por GET o endereço:

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/:token/list/:list_id

#### Renomear um Card
Passar por PATCH o JSON:

{ "token": "PAposhSCEzRouxtck6rgsP", "card_id": "1", "name": "New card 1" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/rename

#### Alterar a data de um Card
Passar por PATCH o JSON:

{ "token": "PAposhSCEzRouxtck6rgsP", "card_id": "1", "data": "dd/mm/yyyy" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/newdata

#### Alterar um CARD de LIST
Passar por PATCH o JSON:

{ "token": "PAposhSCEzRouxtck6rgsP", "card_id": "1", "list_id": "2" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/changelist

#### Excluir um card
Passar por DELETE o JSON:

{ "card_id": "1", "token": "PAposhSCEzRouxtck6rgsP" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/delete

ATENÇÃO: A exclusão é em cascata, excluir o card irá excluir suas tags e comments!!!

#### Adicionar uma tag a um Card
Passar por POST o JSON:

{ "card_id": "7", "tag_id": "1", "token": "FJzHSEWC2Mk7ENhZ4jiakh", }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/addtag

#### Adicionar um comentário a um Card
Passar por POST o JSON:

{ "card_id": "1", "comment": "Comentário 1", "token": "FJzHSEWC2Mk7ENhZ4jiakh" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/addcomment

#### Lista de Comments de um Card
Passar por POST o JSON:

{ "card_id":"1", "token":"AG5VZmKJ8Bm41xFzujC3ZV" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/:token/:card_id/comments

#### Lista de Tags de um Card
Passar por POST o JSON:

{ "card":"1", "token":"AG5VZmKJ8Bm41xFzujC3ZV" }

Para o endereço: https://tads-trello.herokuapp.com/api/trello/cards/:token/:card_id/tags


### Métodos - Outros
#### Lista de Tags
Chamar por GET o endereço:

https://tads-trello.herokuapp.com/api/trello/tags
