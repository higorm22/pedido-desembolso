const {Model, DataTypes} = require('sequelize');

const TABLE_NAME = "tbl_agencias";

class Agencia extends Model {
    static init(sequelize){
        super.init(
            {
                prefixo: DataTypes.INTEGER,
                regional: DataTypes.INTEGER,
                dependencia: DataTypes.STRING,                
            },
            {
                sequelize,
                tableName: TABLE_NAME
            }
        );
    }
}
module.exports = Agencia;