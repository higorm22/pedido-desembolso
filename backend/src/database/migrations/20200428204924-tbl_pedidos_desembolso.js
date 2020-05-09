'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_pedidos_desembolso', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
      },
      regional: Sequelize.INTEGER,
      prefixo: {
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      dependencia: Sequelize.STRING,
      cliente: {
        type:Sequelize.STRING,
        allowNull:false,
      },
      nr_proposta: {
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      valor: {
        type:Sequelize.FLOAT,
        allowNull:false,
      },
      municipio: {
        type:Sequelize.STRING,
        allowNull:true,
      },
      cliente_cop: Sequelize.STRING,
      valor_cop: Sequelize.FLOAT,
      operacao_cop: Sequelize.INTEGER,
      situacao_cop: Sequelize.STRING,
      correio_autorizacao: Sequelize.STRING,
      linha_cop: Sequelize.STRING,
      status: Sequelize.STRING,
      aut: Sequelize.BOOLEAN,
      aut_ate: Sequelize.DATE,
      mci: {
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      mci_cop: Sequelize.INTEGER,
      fonte_recurso: Sequelize.STRING,
      ride: Sequelize.STRING,
      area_atuacao: Sequelize.STRING,
      devolucao: Sequelize.STRING,
      cartao: Sequelize.FLOAT,
      data_autorizacao: Sequelize.DATE,
      data_cadastro: {
        type:Sequelize.DATE,
        allowNull:false,
      },
      estado: {
        type:Sequelize.STRING,
        allowNull:false,
      },
      motivo_exclusao: Sequelize.STRING,
      data_acolhimento: Sequelize.DATE,
      taxa_juros: Sequelize.FLOAT,
      data_despacho: Sequelize.DATE,
      data_formalizacao: Sequelize.DATE,
      prefixo_op: Sequelize.INTEGER,
      prorrogrado: Sequelize.BOOLEAN,
      matricula: Sequelize.STRING,
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
         return queryInterface.dropTable('tbl_pedidos_desembolso');
  }
};
