FROM node:20-alpine

WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install --production

# Copiar código
COPY . .

# Instalar bash y curl para wait-for-it
RUN apk add --no-cache bash curl

# Descargar wait-for-it
RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x wait-for-it.sh

EXPOSE 4000

# Esperar a que la DB esté lista antes de iniciar
CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]
