# Features

- user will signup and log in using jwt token with http only cookie.
- test db connection (http://localhost:2727/test/db)

# How To Run

- **Make sure you have docker installed**
### run app locally and db on docker
```bash
# run db
docker compose -f docker-compose.dev.yml up -d
# install dependency
pnpm install
# apply migration and generate prisma client
npm run p-mg-prod
npm run p-gen
# run app on development mode on port https://localhost:2727
npm run dev
# test db connected or not on (http://localhost:2727/test/db)

```

### run both app and db on docker
```
docker compose up -d
```

### Used Tech Stack
**Backend**
- Express JS
- Prisma
- PostgreSQL
- JWT, BCryptJS
- Joi Validator
- Typescript

