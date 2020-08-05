module.exports = {
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "123",
    database: "super_off",
    defined:{
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at"
    }
}