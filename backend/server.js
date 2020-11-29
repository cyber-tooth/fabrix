require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var router = require('./routes/routes');
const cors = require('cors');
const errorHandler = require('./security/error-handler.js');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
}));

// global error handler
app.use(errorHandler);

// include the routers
router(app);
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
