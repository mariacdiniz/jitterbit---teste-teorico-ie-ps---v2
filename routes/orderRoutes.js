const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
// Criar pedido
router.post('/',auth, orderController.createOrder);

// Obter pedido por orderId
router.get('/:orderId', auth, orderController.getOrder);

// Listar todos os pedidos
router.get('/list', auth, orderController.getAllOrders);

// Atualizar pedido
router.put('/:orderId', auth, orderController.updateOrder);

// Deletar pedido
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;