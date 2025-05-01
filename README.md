# School Management Front

Este é o frontend do sistema de gerenciamento de matriculas, desenvolvido com React, TypeScript e Vite.

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/anderssoncosta/school-management-front
cd school-management-front
```

2. Instale as dependências:
```bash
# Usando npm
npm install

# Ou usando yarn
yarn install
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
VITE_API_URL=http://localhost:8080
```

2. Certifique-se de que o backend está rodando na porta especificada na variável `VITE_API_URL`.

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
# Usando npm
npm run dev

# Ou usando yarn
yarn dev
```

O projeto estará disponível em `http://localhost:5173` por padrão.

## Funcionalidades

- Gerenciamento de Alunos
  - Listagem com paginação
  - Busca por nome e email
  - Criação de novos alunos
  - Edição de alunos existentes
  - Exclusão de alunos

- Gerenciamento de Cursos
  - Listagem com paginação
  - Busca por nome e descrição
  - Criação de novos cursos
  - Edição de cursos existentes
  - Exclusão de cursos

- Gerenciamento de Matrículas
  - Listagem com paginação
  - Criação de novas matrículas
  - Exclusão de matrículas


## Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

