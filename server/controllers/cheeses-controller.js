const express = require('express');

const CheesesController = express.Router();

CheesesController.get('/', async (req, res) => {
  const { Cheese } = req.context.models;

  const cheeses = await Cheese.findAll();
  
  return res.json({ cheeses });
});

CheesesController.post('/', async (req, res) => {
  const { name, description, categoryID } = req.body;
  const { Cheese, Category } = req.context.models;


  const category = await Category.findById(categoryID);
  if (!category) return res.status(400).json({ error: 'category does not exist' })

  const cheese = await Cheese.create({ name, description, category_id: categoryID });
  // add cheese.category data
  cheese.setDataValue('category', await cheese.getCategory());

  return res.json({ cheese });
});

CheesesController.get('/category/:categoryID', async (req, res) => {
  const { categoryID } = req.params;
  const { Cheese } = req.context.models;

  const cheeses = await Cheese.findAll({ where: { category_id: categoryID } });
  
  return res.json({ cheeses });
});

CheesesController.get('/:cheeseID', async (req, res) => {
  const { cheeseID } = req.params;
  const { Cheese } = req.context.models;

  const cheese = await Cheese.findById(cheeseID);
  if (!cheese) return res.status(404).json({ error: 'cheese not found' });
  
  return res.json({ cheese });
});

CheesesController.delete('/:cheeseID', async (req, res) => {
  const { cheeseID } = req.params;
  const { Cheese } = req.context.models;

  const removed = await Cheese.destroy({ where: { id: cheeseID } });
  if (removed === 0) return res.status(400).json({ error: 'cheese does not exist' });

  return res.sendStatus(204);
});

module.exports = CheesesController;
