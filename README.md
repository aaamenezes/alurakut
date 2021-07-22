# Alurakut (clone do Orkut)

## Descrição

Esse projeto foi desenvolvido durante a [Imersão React da Alura](https://www.alura.com.br/imersao-react).

Com essa réplica do Orkut é possível criar comunidades e adicionar pessoas (através do seu usuário no Github) à lista de amigos (chamada de **Pessoas da comunidade**).

Os seguidores que aparecem na página inicial são dados carregados da API do Github. As demais informações (comunidades e pessoas da comunidade) são salvos no DatoCMS e carregados via API GraphQL.

Na página inícial é possível cadastrar e ver esses dados.

Mas nada disso está acessível, caso o usuário não esteja logado. A API de login foi criada pela própria Alura.

## Tecnologias utilizadas

Algumas das tecnologias usadas foram:

- React JS
- Hooks React
- Styled Componentes
- Next JS
- DatoCMS
- Consumir dados de API GraphQL
- [Nookies](https://github.com/maticzav/nookies)

## Referências

A referência visual foi o próprio Orkut.

## Projeto no ar

Você pode acessar o projeto [Alurakut rodando em produção na Vercel](https://alurakut-aaamenezes.vercel.app/).

## Como rodar esse projeto em seu computador

1. Faça um clone do projeto em seu computador:

```
git clone https://github.com/aaamenezes/alurakut.git
```

2. Acesse a pasta do projeto

```
cd alurakut
```

3. Instale as dependências:

```
npm i
```

Ou:

```
yarn
```

4. Inicie o projeto:

```
npm run dev
```

Ou: 

```
yarn dev
```
