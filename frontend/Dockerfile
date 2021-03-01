FROM node:14 AS my-app-build
WORKDIR /app
COPY . .
RUN npm i

EXPOSE 80

CMD ['npm', 'start']
