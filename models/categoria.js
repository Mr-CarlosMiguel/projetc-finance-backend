'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    //tabela finanças criando associação com categoria
    static associate(models) {
      this.hasOne(models.Financa, { foreignKey: 'categoria_id' })
    }
  }
  Categoria.init(
    {
      descricao: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Categoria',
    },
  )
  return Categoria
}
