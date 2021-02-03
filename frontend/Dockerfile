FROM node:14 AS my-app-build
WORKDIR /app
COPY . .
RUN npm i && npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=my-app-build /app/dist/frontend/ /usr/share/nginx/html
EXPOSE 80
