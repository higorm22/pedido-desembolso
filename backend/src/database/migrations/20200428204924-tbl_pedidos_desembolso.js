"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_pedidos_desembolso", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      regional: {
        type:Sequelize.INTEGER,
        allowNull: true,
      },
      prefixo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dependencia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nr_proposta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      municipio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cliente_cop: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor_cop: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      operacao_cop: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      situacao_cop: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      correio_autorizacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linha_cop: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "ANALISE",
      },
      aut: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      aut_ate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      mci: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mci_cop: {
        type: Sequelize.STRING,
      allowNull: true,
      },
      fonte_recurso: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ride: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      area_atuacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      devolucao: {
        type:Sequelize.STRING,
        allowNull: true,
      },
      cartao: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      data_autorizacao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      data_cadastro: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      motivo_exclusao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_acolhimento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      taxa_juros: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      data_despacho: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_formalizacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      prefixo_op: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      prorrogado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      matricula: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tbl_pedidos_desembolso");
  },
};
