const { Model, DataTypes } = require("sequelize");

const TABLE_NAME = "tbl_alteracoes_pedidos";

class AlteracaoPedido extends Model {
  static init(sequelize) {
    super.init(
      {
        valor_anterior: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        novo_valor: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        prazo_anterior: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        novo_prazo: DataTypes.DATE,
        autorizado_mudanca: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        data_solicitacao: {
          type: DataTypes.DATE,
          defaultValue: new Date(),
        },
        data_autorizacao: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        motivo: DataTypes.STRING,
        analizado: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        correio_enviado: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        numero_correio: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        numero_correio_novo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        PedidoId: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: TABLE_NAME,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Pedido);
  }
}
module.exports = AlteracaoPedido;
