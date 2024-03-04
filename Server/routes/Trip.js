const express = require('express')
var router = express.Router()
var Database = require('../Utils/connect')

// Get particular trip base on tripID
router.get("/", function (req, res) {
    DatabaseConnection = Database('travelapp');
    console.log(req.query)

    queryString = `SELECT * FROM TripInfo WHERE tripID = ${req.query.tripID};`

    console.log(queryString);
    DatabaseConnection.query(queryString, (err, rows) => {
        console.log(rows);
        res.send(rows);
    })
})

// Create New Trip
router.post("/savetrip", (req, res) => {
    DatabaseConnection = Database('travelapp');
    const data = req.body;
    console.log(data);
    const query = `INSERT INTO TripInfo (tripName, tripID, userID, destination, totalDay, startDay, endDay, destinationImage, destinationID) VALUES ('${data.tripName}', ${data.tripID}, '${data.userID}', '${data.destination}', ${data.totalDay}, '${data.startDay}', '${data.endDay}', '${data.destinationImage}', '${data.destinationID}')`;
    console.log(query);
    DatabaseConnection.query(
      query,
      function(error, results, fields) {
        if (error) {
            console.log("Error when insert into database")
            console.log(error)
            res.send(success)
            res.status(207)
        } else{
            res.status(200)
            console.log("Successfully insert into database")
            res.send('success')
        }
      }
    );
});

// Edit Trip
router.put("/savetrip", (req, res) => {
    DatabaseConnection = Database('travelapp');
    const data = req.body;
    console.log(data);
    // Need tripID here to update
    // const query = `INSERT INTO TripInfo (tripName, tripID, userID, destination, totalDay, startDay, endDay, destinationImage, destinationID) VALUES ('${data.tripName}', ${data.tripID}, '${data.userID}', '${data.destination}', ${data.totalDay}, '${data.startDay}', '${data.endDay}', '${data.destinationImage}', '${data.destinationID}')`;
    const updateQuery = `UPDATE TripInfo SET tripName = 'Alfred Schmidt', tripID = 'Frankfurt' WHERE CustomerID = 1`;
    const query = `INSERT INTO TripInfo (tripName, tripID, userID, destination, totalDay, startDay, endDay, destinationImage, destinationID) VALUES ('${data.tripName}', ${data.tripID}, '${data.userID}', '${data.destination}', ${data.totalDay}, '${data.startDay}', '${data.endDay}', '${data.destinationImage}', '${data.destinationID}')`;
    console.log(query);
    DatabaseConnection.query(
      query,
      function(error, results, fields) {
        if (error) {
            console.log("Error when insert into database")
            console.log(error)
            res.send(success)
            res.status(207)
        } else{
            res.status(200)
            console.log("Successfully insert into database")
            res.send('success')
        }
      }
    );
});

// Delete Trip
router.post("/deletetrip", (req, res) => {
    DatabaseConnection = Database('travelapp');
    const data = req.body;
    console.log(data);
    const query = `DELETE FROM TripInfo WHERE tripID = ${req.body.tripID}`;
    console.log(query);
    DatabaseConnection.query(
      query,
      function(error, results, fields) {
        if (error) throw error;
      }
    );
});

// Get all the saved trip of one user
router.get("/savedtrips", function (req, res) {
    DatabaseConnection = Database('travelapp');

    queryString = `SELECT * FROM TripInfo WHERE userid = ${req.query.userid};`

    console.log(queryString);
    DatabaseConnection.query(queryString, (err, rows) => {
        console.log(rows);
        res.send(rows);
    })
})


  

// router.delete("/", function (req, res) {
//     res.send('delete')
// })

// router.put("/", function (req, res) {
//     res.send('put')
// })

module.exports = router
