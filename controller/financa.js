const sequelize = require('sequelize')
const model = require('../models')
const financa = model.Financa
const Op = sequelize.Op

module.exports = {
  async create(req, res) {
    //sempre que algo for pego no corpo (input etc), irá receber em req.body
    try {
      const { data, categoria_id, titulo, valor } = req.body

      const Financa = await financa.create({
        data,
        categoria_id,
        titulo,
        valor,
      })
      return res.json({ msg: 'Finança cadastrada com sucesso' })
    } catch (error) {
      return res.json({ msg: 'Não foi possivel cadastrar' + error })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const { data, categoria_id, titulo, valor } = req.body

      const Financa = await financa.update(
        {
          data,
          categoria_id,
          titulo,
          valor,
        },
        // condição para que o id seja atualizado, verifica se existe
        { where: { id } },
      )
      return res.json({ msg: 'Financa alterada com sucesso' })
    } catch (error) {
      return res.json({ msg: 'Falha ao atualizar' + error })
    }
  },

  async findAll(req, res) {
    try {
      const limite = 5
      const { page } = req.params

      // lista e contar todos os id
      const Financa = await financa.findAndCountAll({
        order: [['id', 'ASC']],
        limit: limite,
        include: {
          all: true,
        },
        offset: parseInt(page),
      })
      // include, inclue a categoria vinculada a finança
      return res.json({ Financa })
    } catch (error) {
      return res.json({ msg: 'error ao listar' + error })
    }
  },
  //filtro de datas
  async findAllData(req, res) {
    try {
      const limite = 5
      const { page, datainicial, dataFinal } = req.params

      const Financa = await financa.findAndCountAll({
        limit: limite,
        offset: parseInt(page),
        where: {
          data: {
            [Op.gte]: datainicial,
            [Op.lte]: dataFinal,
          },
        },
      })

      return res.json({ Financa })
    } catch (error) {
      return res.json({ msg: 'error ao listar' + error })
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params

      const Financa = await financa.destroy({
        where: {
          id: id,
        },
      })
      return res.json({ msg: 'Sucesso ao deletar finança' })
    } catch (error) {
      res.json({ msg: 'Erro ao deletar finança' + error })
    }
  },

  //soma dos inputs
  async findByID(req, res) {
    try {
      const { id } = req.params
      var saldo = 0
      var soma = 0

      const Financa = await financa.findAll({
        where: {
          categoria_id: parseInt(id),
        },
        include: {
          all: true,
        },
      })
      if (Financa.length === 0) {
        res.json({ saldo })
      } else {
        for (soma of Financa) {
          saldo = saldo + soma.valor
        }
        return res.json({ saldo })
      }
    } catch (error) {}
  },
}
