# 1단계: 빌드용 이미지
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

# 2단계: 실제 배포용 Nginx 이미지
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
