# TaskFlow

Gerenciador de tarefas compartilhadas desenvolvido no Hackathon Full Stack.
Uma API REST em **Java Spring Boot + H2** é consumida por uma aplicação **web Angular** e por um **aplicativo mobile Expo**.

## 👥 Integrantes e responsabilidades

| Integrante | Responsabilidade | Branch principal |
|---|---|---|
| **Vitor** | API Java Spring Boot e H2 (`backend/`) | `feat/api-tarefas-vitor` |
| **Emerson** | Interface web Angular (`frontend-web/`) | `feat/angular-tarefas-emerson` |
| **Carlos** | Aplicativo mobile Expo (`frontend-mobile/`) | `feat/expo-tarefas-carlos` |
| **Pedro** | GitHub, board, README, integração e testes | `docs/readme-integracao-pedro` |

Revisões de PR: Pedro revisa o PR do Vitor, Vitor revisa o do Pedro, Emerson revisa o do Carlos e Carlos revisa o do Emerson.

## 📁 Estrutura

```
hackthon-taskflow/
├── backend/          # API Spring Boot + H2
├── frontend-web/     # Angular
├── frontend-mobile/  # Expo / React Native
├── README.md
└── .gitignore
```

## 🔗 URL da API

```
http://localhost:8080/api/tarefas
```

| Método | Rota | Operação |
|---|---|---|
| GET | `/api/tarefas` | Listar (aceita `?status=PENDENTE`) |
| GET | `/api/tarefas/{id}` | Consultar por ID |
| POST | `/api/tarefas` | Cadastrar |
| PUT | `/api/tarefas/{id}` | Editar |
| PATCH | `/api/tarefas/{id}/status` | Alterar status |
| DELETE | `/api/tarefas/{id}` | Excluir |

Exemplo de corpo para cadastro:

```json
{
  "titulo": "Criar tela de login",
  "descricao": "Tela com e-mail e senha",
  "responsavel": "Emerson",
  "status": "PENDENTE",
  "prioridade": "ALTA"
}
```

Exemplo de corpo para alterar status: `{ "status": "CONCLUIDA" }`

Códigos HTTP: `200` OK, `201` criado, `204` excluído, `400` dados inválidos, `404` tarefa não encontrada.

- **status**: `PENDENTE`, `EM_ANDAMENTO` ou `CONCLUIDA`
- **prioridade**: `BAIXA`, `MEDIA` ou `ALTA`

## ▶️ Como executar

### Pré-requisitos

- Java 17 ou superior
- Node.js 20 ou superior
- App **Expo Go** instalado no celular (Play Store / App Store)

### 1. Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run        # Linux/Mac
mvnw.cmd spring-boot:run      # Windows
```

A API sobe em `http://localhost:8080`. Ao iniciar, 4 tarefas de exemplo são cadastradas.
Console do banco H2: `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:mem:taskflowdb`, usuário `sa`, sem senha).

Para rodar os testes: `./mvnw test`

### 2. Frontend web (Angular)

```bash
cd frontend-web
npm install
npm start
```

Acesse `http://localhost:4200`. A URL da API fica em `src/environments/environment.ts`.

### 3. Aplicativo mobile (Expo)

1. Descubra o IP do computador que está rodando a API:
   - Windows: `ipconfig` (campo "Endereço IPv4")
   - Linux/Mac: `ip a` ou `ifconfig`
2. Edite `frontend-mobile/src/config/api.js` e coloque o IP:
   ```js
   export const API_URL = 'http://192.168.0.15:8080/api';
   ```
3. Rode o app:
   ```bash
   cd frontend-mobile
   npm install
   npx expo start
   ```
4. Leia o QR Code com o app Expo Go.

#### ⚠️ Configuração de rede para o celular

- O celular e o computador precisam estar **na mesma rede Wi-Fi**.
- No celular, `localhost` aponta para o próprio celular, por isso é preciso usar o IP do computador.
- No emulador Android, use `http://10.0.2.2:8080/api`.
- Se não conectar, libere a porta **8080** no firewall do computador.
- Se a rede da escola bloquear, use `npx expo start --tunnel` e o roteador/hotspot do celular.

## 🔄 Demonstração do fluxo integrado

1. No **Angular**, cadastre uma nova tarefa.
2. No **Expo**, puxe a lista para baixo para atualizar e abra a tarefa criada.
3. Na tela de detalhes do Expo, altere o status (ex.: para **Concluída**).
4. No **Angular**, clique em **Atualizar** e veja o novo status na tabela.

## 🗂️ Organização (GitHub)

- `main` é a versão oficial; nenhuma alteração entra sem Pull Request revisado.
- Cada funcionalidade em uma branch própria (`feat/...`, `docs/...`).
- Commits no padrão `:emoji: tipo: descrição`, por exemplo `:sparkles: feat: Implementa API de tarefas`.
- Tarefas acompanhadas no GitHub Projects (A fazer, Em andamento, Concluído), com Issues vinculadas aos PRs.
