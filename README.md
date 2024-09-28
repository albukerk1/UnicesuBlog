# UnicesuBlog - Projeto para disciplina de Imersão Profissional

## Aplicação com TypeScript, Express e MySQL
### Documento de Requisitos
Especificação de Requisitos e Avaliação Bimestral

### Passo 1: Configuração Inicial do Projeto com TypeScript

Comece criando o diretório do projeto e entrando nele:
```bash
mkdir mysql-api-ads
cd mysql-api-ads
npm init -y
```

Instale os pacotes necessários:
```bash
npm install express ejs mysql2
```

Adicione o TypeScript e os tipos para Express:
```bash
npm install typescript ts-node @types/node @types/express @types/mysql --save-dev
```

Gere o arquivo de configuração do TypeScript com o seguinte comando:
```bash
npx tsc --init
```

Altere o conteúdo do arquivo `tsconfig.json` gerado para o seguinte:
```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "commonjs",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Passo 2: Organizando a Estrutura de Pastas

Crie os diretórios necessários e o arquivo principal:
```bash
mkdir src
mkdir src/views
touch src/index.ts
```

### Passo 3: Desenvolvendo o Código

Implemente o código dentro de `src/index.ts` com base no repositório de referência. Se esse arquivo ainda não estiver no seu projeto, crie-o.

Também crie os arquivos de template na pasta `src/views`, conforme a estrutura do repositório original.

### Passo 4: Executando a Aplicação

No arquivo `package.json`, configure o script para iniciar a aplicação:
```json
"scripts": {
    "start": "ts-node --transpile-only src/index.ts"
}
```

Adicione o arquivo `docker-compose.yaml` na raiz do projeto, seguindo o modelo fornecido no repositório original.

Agora, para iniciar a aplicação, utilize os comandos:
```bash
docker compose up -d
npm start
```

**Observação:** Certifique-se de que o Docker esteja ativo antes de iniciar o projeto.

---

# API Endpoints

Abaixo estão descritos os principais endpoints da API, a qual utiliza TypeScript, Express e MySQL, abordando a funcionalidade e os métodos utilizados em cada rota.

## Endpoints

### 1. **Listar Usuários**

- **URL:** `/users`
- **Método:** `GET`
- **Descrição:** Retorna uma lista de usuários, incluindo o ID, nome, e-mail, status (ativo), descrição do papel, e a data de criação formatada.
- **Resposta:** Renderiza a página `users/index` com a lista de usuários recuperados do banco de dados.
- **Detalhes do SQL:**
  - Realiza uma consulta `JOIN` entre as tabelas `users` e `papel` para obter o papel associado a cada usuário.
  - Ordena os resultados pelo ID do usuário em ordem crescente.
- **Tratamento de Erros:** Em caso de erro, retorna um status `500 - Internal Server Error` e um log da falha é exibido no console.

```bash
GET /users
```

Exemplo de resposta esperada:

```json
[
    {
        "id": 1,
        "name": "João Silva",
        "email": "joao@example.com",
        "ativo": 1,
        "descricao": "Administrador",
        "formatted_date": "23-09-2024"
    },
    {
        "id": 2,
        "name": "Maria Souza",
        "email": "maria@example.com",
        "ativo": 0,
        "descricao": "Usuário",
        "formatted_date": "15-08-2024"
    }
]
```

---

### 2. **Formulário de Adição de Usuário**

- **URL:** `/users/add`
- **Método:** `GET`
- **Descrição:** Exibe um formulário para adicionar um novo usuário.
- **Resposta:** Renderiza a página `users/form` para permitir a entrada dos dados de um novo usuário.

```bash
GET /users/add
```

---

### 3. **Login de Usuário**

- **URL:** `/login`
- **Método:** `GET`
- **Descrição:** Exibe a página de login para os usuários entrarem no sistema.
- **Resposta:** Renderiza a página `users/login`.

```bash
GET /login
```

---

### 4. **Página Principal (Blog)**

- **URL:** `/`
- **Método:** `GET`
- **Descrição:** Exibe a página principal do blog.
- **Resposta:** Renderiza a página `users/blog`.

```bash
GET /
```

---

## Caso encontre Erros

- Se houver algum problema ao recuperar os dados dos usuários (no endpoint `/users`), o servidor retornará um erro 500 com a mensagem de "Internal Server Error".
