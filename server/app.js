const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const {
  MenusController,
  CheesesController,
  CategoriesController,
} = require('./controllers');
const models = require('../db/models');

const app = express();

app.use(
  cors(),
  bodyParser.json(), 
  bodyParser.urlencoded({ extended: false }),
  (req, _, next) => { req.context = { models }; next(); },
);

app.use('/menus', MenusController);
app.use('/cheeses', CheesesController);
app.use('/categories', CategoriesController);

module.exports = app;
