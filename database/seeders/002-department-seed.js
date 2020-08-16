const departments = [
  {id: 1, name: 'Human Resources', locationId: 1 },
  {id: 2, name: 'Sales', locationId: 2 },
  {id: 3, name: 'Marketing', locationId: 2 },
  {id: 4, name: 'Legal', locationId: 1 },
  {id: 5, name: 'Services', locationId: 1 },
  {id: 6, name: 'Research and Development', locationId: 3 },
  {id: 7, name: 'Product Management', locationId: 3 },
  {id: 8, name: 'Training', locationId: 4 },
  {id: 9, name: 'Support', locationId: 4 },
  {id: 10, name: 'Engineering', locationId: 5 },
  {id: 11, name: 'Accounting', locationId: 5 },
  {id: 12, name: 'Business Development', locationId: 3 }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('department', departments);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('department', null, {});
  }
};