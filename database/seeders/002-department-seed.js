const departments = [
  { name: 'Human Resources', locationId: 1 },
  { name: 'Sales', locationId: 2 },
  { name: 'Marketing', locationId: 2 },
  { name: 'Legal', locationId: 1 },
  { name: 'Services', locationId: 1 },
  { name: 'Research and Development', locationId: 3 },
  { name: 'Product Management', locationId: 3 },
  { name: 'Training', locationId: 4 },
  { name: 'Support', locationId: 4 },
  { name: 'Engineering', locationId: 5 },
  { name: 'Accounting', locationId: 5 },
  { name: 'Business Development', locationId: 3 }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('department', departments);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('department', null, {});
  }
};