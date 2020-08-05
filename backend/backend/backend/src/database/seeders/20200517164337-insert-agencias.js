"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("tbl_agencias", [
      {
        prefixo: 3888,
        regional: 8486,
        dependencia: "Vila nova",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tbl_agencias", null, {});
  },
};
