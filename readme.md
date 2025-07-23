# API Restaurante

Uma API para gerenciar um restaurante, incluindo produtos, mesas e pedidos.

## Tecnologias

- Node.js
- Express
- Knex.js
- SQLite

## Como Executar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/api-restaurant.git
   cd api-restaurant
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute as migrações do banco de dados:**

   ```bash
   npm run knex:migrate:latest
   ```

4. **Execute as seeds para popular o banco de dados:**

   ```bash
   npm run knex:seed:run
   ```

5. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

### Produtos

- **`GET /products`**: Lista todos os produtos.

  - **Query Params:** `name` (opcional) - filtra produtos pelo nome.
  - **Exemplo de Resposta:**
    ```json
    [
    	{
    		"id": 1,
    		"name": "Pizza de Calabresa",
    		"price": 45.5,
    		"created_at": "2025-07-22 14:30:00",
    		"updated_at": "2025-07-22 14:30:00"
    	}
    ]
    ```

- **`POST /products`**: Cria um novo produto.

  - **Body:**
    ```json
    {
    	"name": "string",
    	"price": "number"
    }
    ```

- **`PUT /products/:id`**: Atualiza um produto existente.

  - **Body:**
    ```json
    {
    	"name": "string",
    	"price": "number"
    }
    ```

- **`DELETE /products/:id`**: Deleta um produto.

### Mesas

- **`GET /tables`**: Lista todas as mesas.
  - **Exemplo de Resposta:**
    ```json
    [
    	{
    		"id": 1,
    		"table_number": 1,
    		"created_at": "2025-07-22 14:30:00",
    		"updated_at": "2025-07-22 14:30:00"
    	}
    ]
    ```

### Sessões de Mesa

- **`GET /tables-sessions`**: Lista todas as sessões de mesa.
- **`POST /tables-sessions`**: Cria uma nova sessão de mesa (abre uma mesa).

  - **Body:**
    ```json
    {
    	"table_id": "number"
    }
    ```

- **`PATCH /tables-sessions/:id`**: Fecha uma sessão de mesa.

### Pedidos

- **`GET /orders/table-session/:table_session_id`**: Lista todos os pedidos de uma sessão de mesa.
- **`GET /orders/table-session/:table_session_id/total`**: Mostra o valor total e a quantidade de itens de uma sessão de mesa.
- **`POST /orders`**: Cria um novo pedido.
  - **Body:**
    ```json
    {
    	"table_session_id": "number",
    	"product_id": "number",
    	"quantity": "number"
    }
    ```

## Feito por

- **Kevin Solar**
