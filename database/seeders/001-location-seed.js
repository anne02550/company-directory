const locations = [
  { name: 'London' },
  { name: 'New York' },
  { name: 'Paris' },
  { name: 'Munich' },
  { name: 'Rome' }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('location', locations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('location', null, {});
  }
};

