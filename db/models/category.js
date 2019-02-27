module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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

  Category.associate = (models) => {
    Category.hasMany(models.Cheese, { onDelete: 'cascade' });
  };

  return Category;
}