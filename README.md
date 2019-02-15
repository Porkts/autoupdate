# :recycle: AutoUpdate Gitlab Webhook
O AutoUpdate é uma plataforma desenvolvida com o intuito de facilitar a entrega contínua de software, satisfazendo o [Manisfesto Ágil] (https://pt.wikipedia.org/wiki/Manifesto_%C3%81gil), mais especificamente no seguinte trecho:
> “Nossa maior prioridade é satisfazer o cliente, por meio da entrega adiantada e contínua de software de valor.”

## Instalação

Para começar, certifique-se que o seu servidor conta com o [nodejs](https://nodejs.org/en/download/) instalado, e adicionado a variável de ambiente PATH (windows)
O primeiro passo é clonar o projeto na sua máquina local usando o seguinte comando:
```
git clone https://gitlabgaeco.mpse.mp.br/everton.recchi/autoupdate.git
```

Depois do projeto clonado, navegue até a pasta do mesmo:
```
cd autoupdate
```

Após isso, instale os pacotes que a aplicação necessita, com o comando:
```
npm i
```

Feito isso, o npm automaticamente irá criar o arquivo .env com base no arquivo .env.example.
Depois disso configure o arquivo .env de acordo com sua necessidade.

## Rodando a aplicação

Para rodar a aplicação, execute o seguinte comando:
```
npm run start
```
(certifique-se que não há nenhum serviço ou programa usando a porta configurada no arquivo .env)

## Rodando a aplicação como serviço

Caso exista a necessidade de rodar o AutoUpdate como serviço (para iniciar automaticamente com windows por exemplo), após os passos da instalação rode o seguinte comando (o terminal deverá está rodando no modo administrador e o usuário atrelado ao serviço deve ter permissões de administrador):
```
npm run install-windows-service
```
Esse comando irá criar automaticamente o serviço no sistema operacional e iniciará automaticamente o mesmo caso tudo ocorra bem (certifique-se que não há nenhum serviço ou programa usando a porta configurada no arquivo .env).