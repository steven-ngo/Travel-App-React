const express = require('express')
var router = express.Router()
var Database = require('../Utils/connect')

var DatabaseConnection = Database('travelapp');

router.get("/", function (req, res) {
	DatabaseConnection = Database('travelapp');
	console.log(req.query)

	// var totalDays = (+req.query.totalDay)
	var totalDays = parseInt(req.query.totalDay)

	console.log(totalDays)

	queryString = `SELECT poiID , day , name FROM TripDetail WHERE tripID = ${req.query.tripID} AND userID = ${req.query.userID};`
	// SELECT `poiID`,`day` FROM TripDetail WHERE `userID` = 'NVYNz781T8WZQGiYtPNfYOpfo863' AND `tripID` = '878756'

	console.log(queryString);
	DatabaseConnection.query(queryString, (err, rows) => {
		if (err) {
			console.log(err)
			res.send('Hello Error');
		} else {
			respondObject = []
			dayDict = {}
			for (object of rows){
				if (object.day in dayDict){
					dayDict[object.day].push({
						place_id: object.poiID,
						name: object.name,
					})
				} else{
					dayDict[object.day] = []
					dayDict[object.day].push({
						place_id: object.poiID,
						name: object.name,
					})
				}
			}
			// console.log(totalDays)
			for (var i = 1; i <= totalDays; i++){
				// console.log(i)
				if (String(i) in dayDict){
					// console.log('inif')
					console.log(dayDict[String(i)])
				} else{
					// console.log('inelse')
					dayDict[String(i)] = []
				}
			}
			// console.log('HERE')
			console.log(dayDict)
			Object.keys(dayDict).forEach(function (key) {
				console.log(key, dayDict[key]);
				respondObject.push({
					day: key,
					list: dayDict[key]
				})
			});
			console.log(rows)
			// res.send(rows);
			console.log(respondObject)
			res.send(respondObject);
		}
	})
})

router.post("/", function (req, res) {
	DatabaseConnection = Database('travelapp');
	const data = req.body;
	console.log(data);
	var query = 'INSERT INTO TripDetail (poiID, day, userID, tripID, name) VALUES ';
	for (thing of req.body.tupleList){
		query += '("' + thing.poiID + '", "' + thing.day + '", "' + thing.userID + '", "' + thing.tripID + '", "'+ thing.name+'"),'
	}
	query = query.substring(0, query.length - 1)
	query += ';'

	console.log(query);
	DatabaseConnection.query(
		query,
		function (error, results, fields) {
			if (error) {
				console.log("Error when insert into database")
				console.log(error)
				res.status(207)
			} else {
				res.status(200)
				console.log("Successfully insert day detail into database")
			}
		}
	);
})

// This route is for updating the POI 
router.put("/", function (req, res) {
	var DatabaseConnection = Database('travelapp');
	// Think about how to delete the POI and add new POI
	const data = req.body;
	console.log(data);
	var query = 'DELETE FROM TripDetail WHERE userID="'+ req.body.tupleList[0].userID + '" AND tripID="'+req.body.tupleList[0].tripID+ '"; ';
	console.log(query);
	DatabaseConnection.query(
		query,
		function (error, results, fields) {
			if (error) {
				console.log("Error when DELETE FROM database")
				console.log(error)
				// res.send(success)
				res.status(207)
			} else {
				var query2 = 'INSERT INTO TripDetail (poiID, day, userID, tripID, name) VALUES ';
				for (thing of req.body.tupleList) {
					query2 += '("' + thing.poiID + '", "' + thing.day + '", "' + thing.userID + '", "' + thing.tripID + '", "' + thing.name + '"),'
				}
				query2 = query2.substring(0, query2.length - 1)
				query2 += ';'
				console.log(query2);
				// var DatabaseConnection = Database('travelapp');
				DatabaseConnection.query(
					query2,
					function (error, results, fields) {
						if (error) {
							console.log("Error when insert into database")
							console.log(error)
							res.status(207)
						} else {
							res.status(200)
							console.log("Successfully insert day detail into database")
						}
					}
				);
				// res.status(200)
				// console.log("Successfully DELETE and INSERT INTO database")
			}
		}
	);
})

module.exports = router