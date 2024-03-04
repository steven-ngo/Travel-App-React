const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
var Database = require('./Utils/connect')
var tripRoute = require('./routes/Trip')
var dayDetail = require('./routes/DayDetailTrip')
var user = require('./routes/user')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => res.send('Travel App API'))
app.get('/hello', (req, res) => res.send({name: "PHUC"}))

// Trip Route
app.use('/trip', tripRoute)

// Trip Route
app.use("/user", user);

// DayDetail Route
app.use('/daydetail', dayDetail)

// Create the port listen at port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))