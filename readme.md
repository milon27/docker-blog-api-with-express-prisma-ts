# Features

- user will signup and log in using jwt token with http only cookie.
- test db connection (http://localhost:2727/test/db)

# How To Run

- **Make sure you have docker installed**
## postgresql and api will run on docker
```bash
# run db
docker compose up -d
# install dependency
pnpm install
# apply migration and generate prisma client
npm run p-mg-prod
npm run p-gen
# run app on development mode on port https://localhost:2727
npm run dev
# test db connected or not on (http://localhost:2727/test/db)

```

## Used Tech Stack
**Backend**
- Express JS
- Prisma
- PostgreSQL
- JWT, BCryptJS
- Joi Validator
- Typescript

