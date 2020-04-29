# Desafio Mundiale.
## Desafio proposto pela mundiale para vaga de back-end


Instruções:
Para instalar utilize yarn ou npm, para instalar as dependências 

```javascript
yarn
npm i
```

Utilize o script start para rodar o sistema

```javascript
yarn start
npm run start
```

Para rodar os testes utilize o script test

```javascript
yarn test
npm run test
```

Por padão as portas usadas são 3000 para o servidor e 3002 para os testes.

Também existe a possibilidade de executar o processo em containers utilizando o comando
```javascript
docker-compose up
```
Ficando disponivel no ip do seu computador na porta 3000

### Crawler Mercado Livre
Objetivo:
Desenvolver um crawler (coletor) utilizando Node.js capaz de buscar uma lista de produtos no
Mercado Livre. Deve disponibilizar um endpoint que receba, via POST, o seguinte JSON:
```javascript
{
  "search": String, // termo usado na busca "limit":
  Int // número de registrosretornados
}
```

body
```javascript
{
	"search": "teste",
	"int": 2
}
```

Retorno esperado:

```javascript
[
  {
    "name": String, // Nome do produto,
    "link": String, // Link do produto,
    "price": Number, // Preço
    "store": String, // Nome da loja, se houver
    "state": String // Estado, se houver
  }
]
```

Retorno do sistema
```javascript
[
    {
        "name": "Multímetro Digital Profissional Cabo Multi Teste Portátil",
        "link": "https://produto.mercadolivre.com.br/MLB-834130007-multimetro-digital-profissional-cabo-multi-teste-portatil-_JM#position=1&type=item&tracking_id=a384a383-b364-47cc-bcb6-1f1032ccf5d8",
        "price": "R$ 29 90",
        "store": "Sem informação de loja",
        "state": "Sem informação de estado"
    },
    {
        "name": "Alcon Labcon Test Amônia Tóxica Água Doce - 50 Testes",
        "link": "https://produto.mercadolivre.com.br/MLB-685504635-alcon-labcon-test-amnia-toxica-agua-doce-50-testes-_JM#position=2&type=item&tracking_id=a384a383-b364-47cc-bcb6-1f1032ccf5d8",
        "price": "R$ 32 99",
        "store": "Sem informação de loja",
        "state": "Sem informação de estado"
    }
]
```
