const { Model, DataTypes } = require("sequelize");

const TABLE_NAME = "tbl_pedidos_desembolso";

class Pedido extends Model {
  static init(sequelize) {
    super.init(
      {
        regional: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        prefixo: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        dependencia: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cliente: DataTypes.STRING,
        nr_proposta: DataTypes.STRING,
        valor: DataTypes.FLOAT,
        municipio: DataTypes.STRING,
        cliente_cop: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        valor_cop: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        operacao_cop: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        situacao_cop: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        correio_autorizacao: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        linha_cop: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: "ANALISE",
        },
        aut: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        aut_ate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        mci: DataTypes.STRING,
        mci_cop: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        fonte_recurso: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ride: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        area_atuacao: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        devolucao: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cartao: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        data_autorizacao: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        data_cadastro: {
          type: DataTypes.DATE,
          defaultValue: new Date(),
        },
        estado: DataTypes.STRING,
        motivo_exclusao: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        data_acolhimento: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        taxa_juros: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        data_despacho: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        data_formalizacao: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        prefixo_op: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        prorrogado: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        matricula: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: TABLE_NAME,
      }
    );
  }
}
module.exports = Pedido;
