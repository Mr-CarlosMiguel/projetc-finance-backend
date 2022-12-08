'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Financas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        validate: {
          notEmpty: { msg: 'Voce precisa colocar uma data' },
        },
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Campo categoria não pode ser vazio' },
        },
        references: {
          model: 'Categoria',
          kay: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: 'Voce precisa colocar um titulo' },
        },
      },
      valor: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        validate: {
          notEmpty: { msg: 'Voce precisa adcionar algum valor' },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Financas')
  },
}
