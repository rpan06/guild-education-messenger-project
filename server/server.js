const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const InitiateMongoServer = require('./config/mongo_db');
const path = require('path');

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Working' });
});

app.use('/message', routes);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
