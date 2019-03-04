const express = require('express');

const MenuController = express.Router();

const injectMenu = async (req, res, next) => {
  const { menuID } = req.params;
  const { Menu } = req.context.models;
  
  const menu = await Menu.findById(menuID);
  if (!menu) return res.status(404).json({ error: 'menu not found' });
  
  req.context.menu = menu;
  next();
};

MenuController.get('/', (req, res) => {
  const { menu } = req.context;

  return res.json({ menu });
});

MenuController.get('/cheeses', async (req, res) => {
  const { menu } = req.context;

  // do not include join table data
  const cheeses = await menu.getCheeses({ joinTableAttributes: [] });

  return res.json({ cheeses });
});

MenuController.post('/cheeses', async (req, res) => {
  const { cheeseID } = req.body;
  const { menu, models: { Cheese } } = req.context;

  const cheese = await Cheese.findById(cheeseID);
  if (!cheese) return res.status(400).json({ error: 'cheese does not exist' });

  // if menu already has cheese -> reject
  const hasCheese = await menu.hasCheese(cheese);
  console.log({ hasCheese });
  if (hasCheese) return res.status(400).json({ error: 'cheese already in menu' });
  
  await menu.addCheese(cheese);

  return res.json({ cheese });
});

MenuController.delete('/cheeses/:cheeseID', async (req, res) => {
  const { cheeseID } = req.params;
  const { menu, models: { Cheese } } = req.context;

  const cheese = await Cheese.findById(cheeseID);
  if (!cheese) return res.status(400).json({ error: 'cheese does not exist' });

  const hasCheese = await menu.hasCheese(cheese);
  if (!hasCheese) return res.status(400).json({ error: 'cheese not in menu' });

  await menu.removeCheese(cheese);
  return res.sendStatus(204);
});

module.exports = {
  injectMenu,
  MenuController,
}