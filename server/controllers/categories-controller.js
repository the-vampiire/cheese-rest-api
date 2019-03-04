const express = require('express');

const CategoriesController = express.Router();

CategoriesController.get('/', async (req, res) => {
  const { Category } = req.context.models;

  const categories = await Category.findAll();

  return res.json({ categories });
});

CategoriesController.post('/', async (req, res) => {
  const { name } = req.body;
  const { Category } = req.context.models;

  const category = await Category.create({ name });

  return res.json({ category });
});

module.exports = CategoriesController;
