const {Model, DataTypes} = require('sequelize');

const TABLE_NAME = "tbl_alteracoes_pedidos";

class AlteracaoPedido extends Model {
    static init(sequelize){
        super.init(
            {
                valor_anterior:DataTypes.FLOAT,
                novo_valor:DataTypes.FLOAT,
                prazo_anterior: DataTypes.DATE,
                novo_prazo: DataTypes.DATE,
                autorizado_mudanca: DataTypes.BOOLEAN,
                data_solicitacao: {
                    type: DataTypes.DATE,
                    defaultValue: new Date(),
                },
                data_autorizacao: DataTypes.DATE,
                motivo: DataTypes.STRING,
                analizado: DataTypes.BOOLEAN,
                correio_enviado: DataTypes.BOOLEAN,
                numero_correio: DataTypes.STRING,
                matricula: DataTypes.STRING,
                PedidoId: DataTypes.INTEGER,

            },
            {
                sequelize,
                tableName: TABLE_NAME
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Pedido);
    }
}
module.exports = AlteracaoPedido;