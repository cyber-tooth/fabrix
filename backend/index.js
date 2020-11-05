const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//set up port
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

//add routes
const router = require('./routes/router.js');
app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const server = http.createServer(function(request, response) {
    response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8'});
    response.write('Hallo ');
    response.end('Projekte !\n')
});

server.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});