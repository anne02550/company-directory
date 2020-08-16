const locations = [
  { id: 1, name: 'London'},
  { id: 2, name: 'New York'},
  { id: 3, name: 'Paris'},
  { id: 4, name: 'Munich'},
  { id: 5, name: 'Rome'}
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('location', locations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('location', null, {});
  }
};

