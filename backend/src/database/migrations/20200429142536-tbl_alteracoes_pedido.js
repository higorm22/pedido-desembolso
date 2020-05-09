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
      valor_anterior: Sequelize.FLOAT,
      novo_valor: Sequelize.FLOAT,
      prazo_anterior: Sequelize.DATE,
      novo_prazo: Sequelize.DATE,
      autorizado_mudanca: Sequelize.BOOLEAN,
      data_solicitacao: Sequelize.DATE,
      data_autorizacao: Sequelize.DATE,
      motivo: Sequelize.STRING,
      analizado: Sequelize.BOOLEAN,
      correio_enviado: Sequelize.BOOLEAN,
      numero_correio: Sequelize.STRING,
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
    return queryInterface.dropTable('tbl_alteracoes_pedidos');
  }
};