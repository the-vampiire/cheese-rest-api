const express = require('express');

const CheesesController = express.Router();

CheesesController.get('/', async (req, res) => {
  const { Cheese } = req.context.models;
  const cheeses = await Cheese.findAll();
  return res.json({ cheeses });
});

CheesesController.post('/', async (req, res) => {
  const { name, description, categoryID } = req.body;
  const { Cheese } = req.context.models;

  const cheese = await Cheese.create({ name, description, category_id: categoryID });
  cheese.setDataValue('category', await cheese.getCategory());

  res.json({ cheese });
});

CheesesController.get('/category/:categoryID', async (req, res) => {
  const { categoryID } = req.params;
  const { Cheese } = req.context.models;

  const cheeses = await Cheese.findAll({ where: { category_id: categoryID } });
  res.json({ cheeses });
});

CheesesController.get('/:cheeseID', async (req, res) => {
  const { cheeseID } = req.params;
  const { Cheese } = req.context.models;

  const cheese = await Cheese.findById(cheeseID);
  if (!cheese) return res.sendStatus(404);
  
  return res.json({ cheese });
});

CheesesController.delete('/:cheeseID', async (req, res) => {
  const { cheeseID } = req.params;
  const { Cheese } = req.context.models;

  const removed = await Cheese.destroy({ where: { id: cheeseID } });
  if (removed === 0) return res.sendStatus(400);

  return res.sendStatus(204);
});

module.exports = CheesesController;
