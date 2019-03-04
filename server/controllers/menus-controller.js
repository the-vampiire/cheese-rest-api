const express = require('express');

const { MenuController, injectMenu } = require('./menu-controller');

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

  // TODO: location header
  res.json({ menu });
});

MenusController.use('/:menuID', injectMenu, MenuController);

module.exports = MenusController;
