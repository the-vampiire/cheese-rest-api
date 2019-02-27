const profile = {
  username: 'cheese_api',
  password: 'cheese_api',
  database: 'cheese_api',
  host: '127.0.0.1',
  dialect: 'mysql',
  define: {
    underscored: true,
    underscoredAll: true,
  },
};

module.exports = {
  test: profile,
  development: profile,
  production: profile,
};
