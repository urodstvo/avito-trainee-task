FROM node:20.0.0-slim

ENV NODE_ENV production

RUN corepack enable

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD pnpm preview
