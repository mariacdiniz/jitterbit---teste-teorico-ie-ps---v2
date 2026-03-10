const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const setupSwagger = require('./swagger');

const app = express();
const PORT = 3000;


app.use(express.json());
// Conectar MongoDB

const orderRoutes = require('./routes/orderRoutes');
app.use('/order', orderRoutes);

connectDB();

// Middleware para JSON
app.use(bodyParser.json());

// Configurar Swagger
setupSwagger(app);

// Rotas
app.use('/order', orderRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API de Pedidos funcionando!');
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
  console.log('Swagger disponível em http://localhost:3000/api-docs');
});