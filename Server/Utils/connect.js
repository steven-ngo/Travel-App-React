var mysql = require('mysql');

module.exports = function (input_database) {
    Database = {}
    Database.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'travelgroup',
        database: input_database
    });
    Database.connection.connect();
    return Database.connection;
}

