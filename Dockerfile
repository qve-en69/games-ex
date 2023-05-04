FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install ci --force

COPY . .
RUN npm run build --production
# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
