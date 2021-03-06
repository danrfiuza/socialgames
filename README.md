# Social Games: A rede social dos jogadores de Board Games

<a href="https://github.com/SocialBoardGames/socialgames"><img src="https://raw.githubusercontent.com/SocialBoardGames/socialgames/master/public/img/logoSocialGames.png" align="left" hspace="10" vspace="6"></a>

**Social Games** é uma plataforma social voltada para os jogadores de Board Games. Ela possibilita que o jogador tenha uma experiência totalmente nova marcando partidas e registrando seus resultados, comparando seu desempenho com seus amigos. Além disso, todas as informações dos seus jogos preferidos estão aqui.
**Social Games** terá foco principal nos dispositivos mobiles, mas também funcionará como um portal.

## Requerimentos

Para utilizar e também colaborar com este projeto você vai precisar ter instalado no seu computador:

* [Meteor 1.4](https://www.meteor.com/)
* [Node +6.9](https://nodejs.org/en/)
* [Npm +4.0](https://www.npmjs.com/)

Além disso, você precisa conhecer o banco de dados que utilizamos [MongoDB](https://www.mongodb.com/) (já vem junto ao instalar o Meteor), e bastante de [JavaScript](https://www.javascript.com/).

## Instalação

Após cumprir os requerimentos você deve executar três simples passos em seu console:

`meteor npm install`

`meteor npm install --save bcrypt`

Renomeie o arquivo settings-copy.json para settings.json e preencha o arquivo com as informações do seu ambiente.

Por exemplo, para conseguir acessar as funcionalidades da plataforma através do login do Facebook, você precisará criar um app de desenvolvedor no seu Facebook e preencher os dados de `appId` e `secret` neste arquivo. Se não desejar configurar o Facebook, tudo bem. Você pode se registrar criando um usuário/senha.

Além disto, as configurações para envio de e-mail tambem devem ser configuradas neste arquivo.

Então, após adicionar as configurações, rode este comando:

`meteor --settings settings.json` ou `./run.sh`

Este último irá rodar o servidor Meteor e disponibilizará a url http://localhost:3000/ para você trabalhar. 

E está pronto. Você já pode desfrutar!

## Referência das dependencias utilizadas

[Aqui vai encontrar o caminho para enteder como utilizar os pacotes utilizados neste projeto](https://github.com/SocialBoardGames/socialgames/blob/master/REFERENCIA.md)

## Quer nos ajudar a finalizar o projeto?

Nossa meta é finalizar logo o [MVP](https://pt.wikipedia.org/wiki/Produto_vi%C3%A1vel_m%C3%ADnimo) do sistema para em seguida já podermos publicar, espalhando e utilizando o sistema o máximo possível, sem nunca deixar de criar novas funcionalidades e melhoramentos.
A principal funcionalidade que queremos deixar pronta é a criação de Partidas. Assim que isto estiver pronto, publicaremos.
Abaixo, deixamos a descrição de tudo o que já está pronto no sistema e o que ainda falta fazer.

* [O que já está pronto](https://github.com/SocialBoardGames/socialgames/blob/master/PRONTO.md)
* [O que ainda falta fazer](https://github.com/SocialBoardGames/socialgames/blob/master/FAZER.md)

Caso você se sinta envolvido com nosso projeto e queira nos ajudar, simplesmente faça funcionar uma funcionalidade que ainda não foi desenvolvida e nos envie um `pull request` que brevemente avaliaremos e disponibilizaremos no Social Games. Não é o máximo?

## MongoDB Query Helper

http://jasonmciver.com/basic-mongodb-queries/
