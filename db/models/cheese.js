module.exports = (sequelize, DataTypes) => {
  const Cheese = sequelize.define(
    'Cheese',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
        validate: {
          len: [3, 15],
        },
      },

      description: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    {
      // eager loads category for every cheese
      defaultScope: {
        include: [{
          as: 'category',
          required: true,
          model: sequelize.models.Category,
        }],
      },
    },
  );

  Cheese.associate = (models) => {
    Cheese.belongsTo(models.Category, { as: 'category' });
    Cheese.belongsToMany(models.Menu, { through: 'menu_cheese' });
  };

  return Cheese;
}