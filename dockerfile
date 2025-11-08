FROM oven/bun:debian
WORKDIR /app

COPY package.json ./
RUN bun install --no-cache

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
