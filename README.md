Lyria – Bot Discord TypeScript

Um bot Discord moderno, com perfil de usuário visual, coins, rank, badges, e cooldown diário.

📦 Dependências

Node.js
 ≥ 18

Discord.js

Canvas

TypeScript

dotenv

⚡ Instalação

Clone o repositório:

git clone https://github.com/seu-usuario/lyria.git
cd lyria


Instale dependências:

npm install


Configure TypeScript:

npx tsc --init


Crie .env baseado no .env.example:

cp .env.example .env


Preencha com:

TOKEN=SEU_TOKEN_DO_BOT
CLIENT_ID=SEU_CLIENT_ID

🛠 Estrutura de pastas
src/
├─ bot.ts                 # Bot principal
├─ deploy-commands.ts     # Deploy dos comandos no Discord
├─ commands/              # Comandos do bot
│  ├─ perfil.ts
│  ├─ resgatar.ts
│  └─ setAbout.ts
├─ database/              # Database local JSON
│  ├─ index.ts
│  └─ userRepo.ts
└─ utils/                 # Funções auxiliares
   └─ canvasProfile.ts

🚀 Deploy de comandos

Sempre que adicionar ou alterar comandos, rode:

npm run deploy


Isso registra os comandos nos servidores.

🤖 Rodando o bot
npm run dev


Se quiser rodar em produção:

ts-node src/bot.ts

💬 Comandos disponíveis
/perfil

Mostra perfil completo do usuário:

Avatar, nome

Rank (calculado por coins)

Coins atuais

Badges

Sobre mim

/resgatar

Resgata 50-100 coins aleatórios

Só pode uma vez a cada 24 horas

Exibe cooldown se tentar antes do tempo

/setabout texto:<texto>

Define ou atualiza o sobre mim

Exibe mensagem de confirmação

💾 Database

Local, em JSON (src/database/users.json)

Estrutura:

{
  "USER_ID": {
    "id": "USER_ID",
    "money": 0,
    "badges": [],
    "about": "",
    "lastClaim": 0
  }
}

🎨 Canvas / Perfil

Largura: 960 px

Altura: 600 px

Avatar circular com borda neon

Layout avatar + informações à direita

Sobre mim abaixo do avatar

Gradiente de fundo + overlay escuro

Badges e insígnias exibidas como ícones bonitos

⚙ Configurações futuras

Adicionar barra de progresso de rank (XP bar)

Badges customizáveis

Suporte a múltiplas línguas

Sistema de coins avançado