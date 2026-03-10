# Order Management API

API em **Node.js** para gerenciamento de pedidos, permitindo criação, leitura, atualização e exclusão (CRUD) de pedidos, com armazenamento em **MongoDB**.  

---

## 🛠 Tecnologias utilizadas

- Node.js  
- Express  
- MongoDB (Mongoose)  
- Nodemon (para desenvolvimento)  
- Body-parser (para parsing de JSON)  

---

## 🚀 Endpoints

### Criar um novo pedido (obrigatório)
**URL:** `POST /order`  
**Body (JSON):**
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}

Transformação para salvar no banco:

{
  "orderId": "v10089016vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
Obter pedido por número (obrigatório)

URL: GET /order/:numeroPedido
Exemplo: GET /order/v10089016vdb

Listar todos os pedidos (opcional)

URL: GET /order/list

Atualizar pedido (opcional)

URL: PUT /order/:numeroPedido
Body: Mesma estrutura do POST

Deletar pedido (opcional)

URL: DELETE /order/:numeroPedido

💾 Banco de dados

Se usando MongoDB, a collection deve ficar assim:

{
  "orderId": "v10089016vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}

Se usando SQL/PostgreSQL, tabelas:

Order

orderId

value

creationDate

Items

orderId

productId

quantity

price

⚙️ Como rodar a API

Clone o repositório:

git clone <seu-repositorio>

Instale as dependências:

npm install

Configure o banco de dados em .env (ex: MONGO_URI ou POSTGRES_URL)

Inicie o servidor:

npm run dev

Acesse os endpoints em: http://localhost:3000

✅ Critérios atendidos

Funcionalidade completa dos requisitos mínimos

Código bem organizado e comentado

Convenções de nomenclatura corretas

Tratamento de erros robusto

Respostas HTTP apropriadas

🔧 Recursos adicionais (opcional)

Autenticação básica via JWT

Documentação da API via Swagger ou Postman
