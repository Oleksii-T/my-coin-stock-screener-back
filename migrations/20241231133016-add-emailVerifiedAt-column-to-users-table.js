'use strict';

const table = 'users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn(
          table,
          'emailVerifiedAt',
          {
            type: Sequelize.DATE,
            allowNull: true,
          },
          { transaction }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([queryInterface.removeColumn(table, 'emailVerifiedAt', { transaction })]);
    });
  },
};
