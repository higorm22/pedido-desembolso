require('../database');

const Agencia = require('../model/Agencia');

module.exports = {
    async index(req,res){
            const agencias = await Agencia.findAll();
            return res.status(200).json(agencias);
    },
    async store(req,res){
        let agencia = await Agencia.create(req.body);
        return res.status(200).json(agencia);
    }
}