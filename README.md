# 💛 Desafio Técnico INmetrics  

## 🔧 Tecnologias usadas 
- **Cypress** | Versão 15
- **Cucumber** | Versão 23
- **Faker.js** | Versão 10

## 📁 Estrutura do projeto
```bash
cypress/
 ├─ e2e/                  # Onde ficam os testes end-to-end
 │   ├─ api/              # Testes e recursos para API
 │   │   ├─ features/     # Cenários BDD (arquivos .feature)
 │   │   └─ services/     # Serviços auxiliares 
 │   └─ web/              # Testes e recursos para interface web
 │       ├─ features/     # Cenários BDD da camada web
 │       └─ pages/        # Page Objects (abstrações de páginas)
 │
 ├─ fixtures/             # Arquivos estáticos (mocks, JSONs de dados)
 │
 ├─ support/              # Configurações e comandos globais
 │   └─ step_definitions/ # Implementações dos steps do BDD (API/Web)
 │       ├─ api/
 │       └─ web/
 │
 ├─ commands.js           # Comandos customizados do Cypress
 └─ e2e.js                # Arquivo de configuração dos testes e hooks
```

## 📝 Pré-requisitos | Instalação | Execução dos testes 

### 📝 Pré-Requisitos 
- Ter o Node.js e NPM instalado na máquina (foi usado a versão 22 do Node.js)

### 📝 Instalação 
1. Clonar repositório | `git clone https://github.com/jvsdiniz/inmetrics-automation-challenge.git`
2. Executar no terminal o comando `npm install` para instalar as dependências do projeto

### 📝 Execução dos testes 
- Executar no terminal o comando`npm run cypress:open` para abrir o menu do cypress e selecionar a feature desejada ou `npm run cypress:run` para executar todos os testes disponíveis

### ✅ CI/CD 
- A pipeline está configurado com GitHub Actions
- Os resultados podem ser acompanhados na aba Actions do repositório

## 👨‍💻 Autor
Desenvolvido por João Diniz
📧 jdinizctt@gmail.com
