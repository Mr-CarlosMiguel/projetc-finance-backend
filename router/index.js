const express = require('express')
const router = express.Router()
const categoria = require('../controller/categoria')
const financa = require('../controller/financa')

// ":" é o parametro criado no crud, put é para atualizar dados
// Rotas da Categoria
router.post('/criar/categoria', categoria.create)
router.get('/listar/categoria/:page', categoria.findAll)
router.put('/atualizar/categoria/:id', categoria.update)

// Rotas da Finança
router.post('/criar/financa', financa.create)
router.get('/listar/financa/:page', financa.findAll)
router.get('/pesquisar/financa/categoria_id/:id', financa.findByID)
router.get('/listar/financa/datainicial/:dataInicial/datafinal/:dataFinal/page/:page', financa.findAllData)
router.put('/atualizar/financa/:id', financa.update)
router.delete('/deletar/financa/:id', financa.delete)

module.exports = router