FROM node:16.3.0-alpine as build
RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN npm run p-gen
RUN npm run build

# # ------------------production -------------------

FROM node:16.3.0-alpine as production
RUN npm install -g pnpm

WORKDIR /app

COPY --from=build /app/.env.docker ./.env
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/dist/ ./dist/

# migrate db to production
# run the app
CMD ["/bin/sh", "-c", "npm run p-mg-prod;node dist/app.js"]