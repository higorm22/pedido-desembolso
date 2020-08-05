'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_agencias', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
      },
      prefixo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      regional: Sequelize.INTEGER,
      dependencia: Sequelize.STRING,
      createdAt: {
        type:Sequelize.DATE,
        allowNull:false,
      },
      updatedAt: {
        type:Sequelize.DATE,
        allowNull:false,
      },
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tbl_agencias');
  }
};
