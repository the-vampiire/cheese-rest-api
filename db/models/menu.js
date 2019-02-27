module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    'Menu',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        required: true,
        validate: {
          len: [3, 15],
        },
      },
    },
  );

  Menu.associate = (models) => {
    Menu.belongsToMany(models.Cheese, { through: 'menu_cheese' });
  };

  return Menu;
}