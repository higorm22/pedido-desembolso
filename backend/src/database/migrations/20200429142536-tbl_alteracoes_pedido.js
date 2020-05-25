'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_alteracoes_pedidos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
      },
      PedidoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tbl_pedidos_desembolso", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      valor_anterior: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      novo_valor: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      prazo_anterior: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      novo_prazo: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      autorizado_mudanca: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      data_solicitacao: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      data_autorizacao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      motivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      analizado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      correio_enviado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      numero_correio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_correio_novo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      matricula: {
        type: Sequelize.STRING,
        allowNull: true,
      },
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
    return queryInterface.dropTable('tbl_alteracoes_pedidos');
  }
};