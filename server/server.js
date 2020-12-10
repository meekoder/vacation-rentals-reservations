const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/queries');

const app = express();
const port = 3002;

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true,
  })
);

app.use(morgan('dev'));
app.use('/', express.json());
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/bookings/:id', db.getBookingsByListingId);
app.post('/bookings', db.createBooking);

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
