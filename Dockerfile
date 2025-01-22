# Используем официальный образ Node.js в качестве базового
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /

RUN apk add --no-cache openssl
# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./
COPY ./prisma ./prisma

# Устанавливаем зависимости
RUN npm install && npm install -g @nestjs/cli

# Копируем остальные файлы проекта в контейнер
COPY . .

# Компилируем TypeScript в JavaScript
RUN npx prisma generate

# Открываем порт для приложения
EXPOSE 3001

# Запускаем приложение
CMD ["npm", "run", "start:dev"]
