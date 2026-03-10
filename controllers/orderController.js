const Order = require('../models/Order');

// Criar pedido (POST)
exports.createOrder = async (req, res) => {
  try {
    const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

    // ✅ Validação
    if (!numeroPedido || typeof numeroPedido !== 'string') {
      return res.status(400).json({ message: 'numeroPedido é obrigatório e deve ser uma string' });
    }
    if (!valorTotal || typeof valorTotal !== 'number') {
      return res.status(400).json({ message: 'valorTotal é obrigatório e deve ser um número' });
    }
    if (!dataCriacao || isNaN(new Date(dataCriacao).getTime())) {
      return res.status(400).json({ message: 'dataCriacao inválida' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'items deve ser um array com pelo menos 1 item' });
    }
    for (const item of items) {
      if (!item.idItem || !item.quantidadeItem || !item.valorItem) {
        return res.status(400).json({ message: 'Cada item deve ter idItem, quantidadeItem e valorItem' });
      }
    }

    // Mapping
    const mappedItems = items.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }));

    const order = new Order({
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: new Date(dataCriacao),
      items: mappedItems
    });

    await order.save();
    res.status(201).json({ message: 'Pedido criado com sucesso!', order });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno ao criar pedido' });
  }
};

// Obter pedido por orderId (GET)
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error: error.message });
  }
};

// Listar todos os pedidos (GET /list)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar pedidos', error: error.message });
  }
};

// Atualizar pedido (PUT)
exports.updateOrder = async (req, res) => {
  try {
    const { valorTotal, dataCriacao, items } = req.body;

    if (valorTotal && typeof valorTotal !== 'number') {
      return res.status(400).json({ message: 'valorTotal deve ser um número' });
    }
    if (dataCriacao && isNaN(new Date(dataCriacao).getTime())) {
      return res.status(400).json({ message: 'dataCriacao inválida' });
    }
    if (items && (!Array.isArray(items) || items.length === 0)) {
      return res.status(400).json({ message: 'items deve ser um array com pelo menos 1 item' });
    }

    const mappedItems = items?.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }));

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      {
        ...(valorTotal && { value: valorTotal }),
        ...(dataCriacao && { creationDate: new Date(dataCriacao) }),
        ...(mappedItems && { items: mappedItems })
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json({ message: 'Pedido atualizado com sucesso!', updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno ao atualizar pedido' });
  }
};

// Deletar pedido (DELETE)
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.orderId });
    if (!deletedOrder) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json({ message: 'Pedido deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pedido', error: error.message });
  }
};