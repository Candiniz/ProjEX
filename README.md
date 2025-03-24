# projEx

projEx foi desenvolvido com o objetivo de **dominar operações básicas em JavaScript**, como manipulação de valores numéricos e monetários, além de administrar valores dinâmicos e a conexão entre frontend e backend.

Inicialmente, a aplicação utilizava um **JSON Server** para armazenar e recuperar dados. No entanto, ao perceber suas limitações, migrei para o **Firebase**, garantindo **mais escalabilidade e desempenho**.

## 🚀 Tecnologias Utilizadas

- **JavaScript (ES6+)** - Manipulação de dados dinâmicos
- **Firebase** - Banco de dados, autenticação e armazenamento
- **HTML5 e CSS3** - Estrutura e estilização da interface

## 🔑 Funcionalidades

- **Sistema de Login Seguro**
  - Autenticação por email e senha via Firebase
- **Gerenciamento de Projetos**
  - Criação, edição e exclusão de projetos
- **Conexão Dinâmica com o Banco de Dados**
  - Armazenamento e recuperação de informações em tempo real

## 📈 Próximos Passos

O projEx tem potencial para evoluir para um verdadeiro **Software as a Service (SaaS)**. Alguns dos recursos planejados incluem:

- 📊 **Modelo de monetização** com planos de assinatura
- 👥 **Suporte multiusuário** com permissões personalizadas
- 🎨 **Melhoria na interface do usuário** para maior usabilidade
- 📊 **Geração de relatórios automáticos** sobre os projetos

## 📂 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Candiniz/projEx.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd projEx
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```
5. Execute o projeto:
   ```bash
   npm start
   ```
6. Acesse **http://localhost:3000** no navegador.

## 🤝 Contribuição

Contribuições são bem-vindas! Para isso:

1. Fork o repositório
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-melhoria
   ```
3. Faça suas modificações e commite:
   ```bash
   git commit -m "Melhoria: Adicionei nova funcionalidade X"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-melhoria
   ```
5. Abra um Pull Request 🚀

## 📜 Licença

Este projeto foi desenvolvido para fins de aprendizado e exploração de tecnologias. Caso tenha interesse em utilizá-lo, entre em contato!

---

🔥 **projEx representa minha jornada no desenvolvimento fullstack**, reforçando conhecimentos em **autenticação, estruturação de dados e escalabilidade**. Obrigado por conferir este projeto! 😊

