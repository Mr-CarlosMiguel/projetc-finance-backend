const sequelize = require('sequelize')
const model = require('../models')
const categoria = model.Categoria

module.exports = {
  async create(req, res) {
    //sempre que algo for pego no corpo (input etc), irá receber em req.body
    try {
      const { descricao } = req.body

      const Categoria = await categoria.create({
        descricao,
      })
      return res.json({ msg: 'Categoria cadastrada com sucesso' })
    } catch (error) {
      return res.json({ msg: 'Não foi possivel cadastrar a categoria' + error })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const { descricao } = req.body

      const Categoria = await categoria.update(
        {
          descricao,
        },
        // condição para que o id seja atualizado, verifica se existe
        { where: { id } },
      )
      return res.json({ msg: 'Categoria alterada com sucesso' })
    } catch (error) {
      return res.json({ msg: 'Falha ao atualizar categoria' + error })
    }
  },

  async findAll(req, res) {
    try {
      const limite = 5
      const { page } = req.params

      // lista e contar todos os id
      const Categoria = await categoria.findAndCountAll({
        order: [['id', 'ASC']],
        limit: limite,
        offset: parseInt(page),
      })
      return res.json({ Categoria })
    } catch (error) {
      return res.json({ msg: 'error ao listar as categorias' + error })
    }
  },
}
