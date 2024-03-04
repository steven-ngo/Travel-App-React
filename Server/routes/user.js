const express = require("express");
var router = express.Router();
var Database = require("../Utils/connect");


router.post("/createUser", (req, res) => {
    DatabaseConnection = Database('travelapp');
    const data = req.body;
    console.log(data);
    const query = `INSERT INTO UserInfo (userEmail, userID) VALUES ('${data.userEmail}', '${data.userID}')`;
    console.log(query);
    DatabaseConnection.query(
        query,
        function (error, results, fields) {
            if (error) {
                console.log("Error when insert into database")
                console.log(error)
                res.send(success)
                res.status(207)
            } else {
                res.status(200)
                console.log("Successfully insert into database")
            }
        }
    );
});

router.get("/", function(req, res) {
  DatabaseConnection = Database("travelapp");

  queryString = `SELECT * FROM UserInfo WHERE userID = ${req.query.userid};`;

  console.log(queryString);
  DatabaseConnection.query(queryString, (err, rows) => {
    console.log(rows);
    res.send(rows);
  })
})


module.exports = router;


