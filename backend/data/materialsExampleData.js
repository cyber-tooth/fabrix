// include mysql module
var mysql = require('mysql');

// create a connection variable with the required details
var con = mysql.createConnection({
    host: "localhost",    // ip address of server running mysql
    user: "root",    // user name to your mysql database
    password: "Adrijana21", // corresponding mysql password
    database: "fabrix" // use the specified database name
});

// make to connection to the database.
con.connect(function(err) {
    if (err) throw err;
    // if connection is successful
    var records = [
        //id,
        [12, 'Adi', 'Jers', '2021-02-10 18:34:34', '2021-02-10 18:34:34']
    ];

    var cons = [
        //material_id, category_id, degree, createdAt, updatedAt
        [12, 22, 5, '2021-02-10 18:34:34', '2021-02-10 18:34:34']
    ];

    con.query("INSERT INTO materials (id, created_by, name, createdAt, updatedAt) VALUES ?", [records], "INSERT INTO consistsOfs (material_id, category_id, degree, createdAt, updatedAt) VALUES ?", [cons], function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result);
    });
});
