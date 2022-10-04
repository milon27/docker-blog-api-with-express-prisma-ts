# Run postgresql container
docker compose up -d

# Make sure you have pnpm
npm i -g pnpm

# Run server
cd server && pnpm install
npm run p-mg-prod
npm run p-gen
npm run seed
npm run dev
