const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//set up port
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

//add routes
const router = require('./routes/router.js');
app.use('/api', router);

//run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//server.listen(8080, () => {
//    console.log('Server is listening to http://localhost:8080');
//});