const { Model, DataTypes } = require("sequelize");

const TABLE_NAME = "tbl_pedidos_desembolso";

class Pedido extends Model {
  static init(sequelize) {
    super.init(
      {
        regional: DataTypes.INTEGER,
        prefixo: DataTypes.INTEGER,
        dependencia: DataTypes.STRING,
        cliente: DataTypes.STRING,
        nr_proposta: DataTypes.INTEGER,
        valor: DataTypes.FLOAT,
        municipio: DataTypes.STRING,
        cliente_cop: DataTypes.STRING,
        valor_cop: DataTypes.FLOAT,
        operacao_cop: DataTypes.INTEGER,
        situacao_cop: DataTypes.STRING,
        correio_autorizacao: DataTypes.STRING,
        linha_cop: DataTypes.STRING,
        status: {
          type: DataTypes.STRING,
          defaultValue: "ANALISE",
        },
        aut: DataTypes.BOOLEAN,
        aut_ate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        mci: DataTypes.INTEGER,//TODO: corrigir para string
        mci_cop: DataTypes.INTEGER,
        fonte_recurso: DataTypes.STRING,
        ride: DataTypes.STRING,
        area_atuacao: DataTypes.STRING,
        devolucao: DataTypes.STRING,
        cartao: DataTypes.FLOAT,
        data_autorizacao: DataTypes.DATE,
        data_cadastro: DataTypes.DATE,
        estado: DataTypes.STRING,
        motivo_exclusao: DataTypes.STRING,
        data_acolhimento: DataTypes.STRING,
        taxa_juros: DataTypes.FLOAT,
        data_despacho: DataTypes.DATE,
        data_formalizacao: DataTypes.DATE,
        prefixo_op: DataTypes.INTEGER,
        prorrogrado: DataTypes.BOOLEAN,
        matricula: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: TABLE_NAME,
      }
    );
  }
}
module.exports = Pedido;
