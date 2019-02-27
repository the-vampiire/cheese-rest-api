const express = require('express');

const MenusController = express.Router();

MenusController.get('/', async (req, res) => {
  const { Menu } = req.context.models;
  const menus = await Menu.findAll();
  return res.json({ menus });
});

MenusController.post('/', async (req, res) => {
  const { name } = req.body;
  const { Menu } = req.context.models;

  const menu = await Menu.create({ name });

  res.json({ menu });
});

MenusController.get('/:menuID', async (req, res) => {
  const { menuID } = req.params;
  const { Menu } = req.context.models;

  const menu = await Menu.findById(menuID);

  if (!menu) return res.sendStatus(404);
  return res.json({ menu });
});

MenusController.get('/:menuID/cheeses', async (req, res) => {
  const { menuID } = req.params;
  const { Menu } = req.context.models;

  const menu = await Menu.findById(menuID);
  if (!menu) return res.sendStatus(404);

  const cheeses = await menu.getCheeses({ joinTableAttributes: [] });

  return res.json({ cheeses });
});

MenusController.post('/:menuID/cheeses', async (req, res) => {
  const { menuID } = req.params;
  const { cheeseID } = req.body;
  const { Menu, Cheese } = req.context.models;

  const menu = await Menu.findById(menuID);
  if (!menu) return res.sendStatus(404);

  const cheese = await Cheese.findById(cheeseID);
  if (!cheese) return res.sendStatus(400);

  const hasCheese = await menu.hasCheese(cheese);
  if (hasCheese) return res.sendStatus(400);
  
  await menu.addCheese(cheese);
  return res.json({ cheese });
});

MenusController.delete('/:menuID/cheeses/:cheeseID', async (req, res) => {
  const { menuID, cheeseID } = req.params;
  const { Menu, Cheese } = req.context.models;

  const menu = await Menu.findById(menuID);
  if (!menu) return res.sendStatus(404);

  const cheese = await Cheese.findById(cheeseID);
  if (!cheese) return res.sendStatus(400);

  const removed = await menu.removeCheese(cheese);
  if (removed === 0) return res.sendStatus(400);

  return res.sendStatus(204);
});

module.exports = MenusController;
