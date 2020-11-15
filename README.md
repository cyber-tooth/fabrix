# fabrix
Website for digital DB for materials

## Local Setup
install nodejs locally

### Running - Docker-Compose (Please this can be only executed after docker session)

To run the project locally, use the `docker-compose.yml`. To build the images, the `db` container needs to be running.
Note: you should install doker and docker-compose localy or in the server
```
docker-compose up -d mysql
docker-compose up -d backend
docker-compose up -d frontend
docker-compose up -d --build mysql
docker-compose up -d --build backend
docker-compose up  -f
```
# backend
## Build Environment (Important!!)
duplicate the file config.json.sample with the name config.json (Important duplicate the file not replace)
config.json include credentials and should be not committed
- adapt the content of the new file config.json with you values e.g host and passord of the db and host, username,password,port and host of smtp server
## start server for development
```
cd backend
npm i 
npm run start:dev
```
## start server to expose the Api (Frontend Team)
```
cd backend
npm i 
npm start
```
## stop the server 
press ctrl+c

##check the openapi (swagger)
after starting the server navigate to http://localhost:4000/api/api-docs/

##added imgs to public folder 
the static contents can be stored in the public/img folder. the frontend get the link of the image
e.g http://localhost:4000/api/public/img/nodejs.jpg

##adapt the open api in swagger editor
copy the content of the ./openapi.yaml and padt in https://editor.swagger.io/, 
after adapting the content (changes) copy the content to the file

# frontend 
## Build Environment (if this needed!!)
adapt the apiUrl with the target desired api url
## start the frontend  (Frontend Team)
```
cd frontend
npm i 
npm start
```
