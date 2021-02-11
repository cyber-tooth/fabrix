# Fabrix
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
# Backend
## Build Environment (Important!!)
duplicate the file config.json.sample with the name config.json (Important duplicate the file not replace)
config.json include credentials and should be not committed
- adapt the content of the new file config.json with you values e.g host and passord of the db and host, username,password,port and host of smtp server
## start  the nodejs server for development
```
cd backend
npm i 
npm run start:dev
```
## start the nodejs server to expose the Api (Frontend Team)
```
cd backend
npm i 
npm start
```
## Stop the server 
press ctrl+c

## Check the openapi (swagger)
after starting the server navigate to http://localhost:4000/api/api-docs/

##A dded imgs to public folder 
the static contents can be stored in the public/img folder. the frontend get the link of the image
e.g http://localhost:4000/api/public/img/nodejs.jpg

## Adapt the open api in swagger editor
copy the content of the ./openapi.yaml and padt in https://editor.swagger.io/, 
after adapting the content (changes) copy the content to the file

# Test with postman
install postman from https://www.postman.com/downloads/ and import the json file from the local folder backend/test-with-postman
# Frontend 
## Build Environment (if this needed!!)
adapt the apiUrl with the target desired api url
## Start the frontend  (Frontend Team)
```
cd frontend
npm i 
npm start
```
# Populating the DB with all the categories
Steps to execute the file with all categories for category model:
1. Update in the dbData.js file in /backend/data folder, your user, pass and DB Name
2. Start the server in backend in terminal with command: npm start
3. Open another terminal window and cd /backend/data 
4. In that new terminal, execute with node the file via the following code:
node dbData.js
5. Go to your DB (in IntelliJ on top right) and click on the Refresh icon above your DB tables. You can click on table icon for category table and you can see all the data there.

# You can create Material with following JSON format:
```The JSON format:
{
    "created_by": "Aaa",
    "name": "Jersey",
    "consistsOf": [
        { "category_id": 22, "degree": "5"},
        { "category_id": 7, "degree": "33"},
        { "category_id": 26, "degree": "62"},
        { "category_id": 39, "degree": null},
        { "category_id": 42, "degree": null},
        { "category_id": 65, "degree": "24,80"},
        { "category_id": 80, "degree": null},
        { "category_id": 81, "degree": null},
        { "category_id": 82, "degree": "35,6"},
        { "category_id": 83, "degree": "142,8"},
        { "category_id": 84, "degree": null},
        { "category_id": 85, "degree": "2"},
        { "category_id": 86, "degree": "17"},
        { "category_id": 87, "degree": null},
        { "category_id": 88, "degree": "3"},
        { "category_id": 89, "degree": "12"},
        { "category_id": 46, "degree": "208,74"},
        { "category_id": 59, "degree": "0,37"},
        { "category_id": 100, "degree": "3,5"},
        { "category_id": 94, "degree": "50.000"},
        { "category_id": 91, "degree": "377"},
        { "category_id": 92, "degree": "277"},
        { "category_id": 47, "degree": null},
        { "category_id": 56, "degree": null},
        { "category_id": 109, "degree": null},
        { "category_id": 110, "degree": "363,6"},
        { "category_id": 111, "degree": "18"},
        { "category_id": 112, "degree": "20,2"}
    ],
    "images": [
        {"name": "Hahnentritt", "url": "/public/img/Hahnentritt.jpeg"}
    ]
}
```
