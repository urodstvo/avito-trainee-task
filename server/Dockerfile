FROM node:20.0.0-slim

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 8000

CMD [ "pnpm", "start" ]
