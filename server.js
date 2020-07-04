'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { flights } = require('./test-data/flightSeating');
const users = [];

const PORT = process.env.PORT || 8000;

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  if (flights[flightNumber]) {
    res.json(flights[flightNumber]);
  } else {
    res.json({
      message: 'not in database',
    })
  }
  
  // // get all flight numbers
  // const allFlights = Object.keys(flights);
  // // is flightNumber in the array?
  // console.log('REAL FLIGHT: ', allFlights.includes(flightNumber));
  // if (allFlights.includes(flightNumber)) {
  //   console.log('true');
  //   res.json({
  //     flight: flights[flightNumber],
  //     message: 'This flight exists in our database',
  //   })
  // } else { 
  //   console.log('false');
  // res.json({
  //   message: 'This flight does not exist in our database',
  // }) }
};


express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get('/flights', (req,res) => {
    console.log(flights);
    res.json({
      flight: Object.keys(flights),
    })
  })
  .get('/flights/:flightNumber', handleFlight)
  .get('/users', (req,res) => {
    console.log(users);
    res.json(users);
  })
  .post('/users', (req,res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json(newUser);
  })
  .get('/seat-select/confirmed/:id', (req,res) => {
    res.sendFile('/confirmed.html')
  })
  .use((req, res) => res.send('Not Found'))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
