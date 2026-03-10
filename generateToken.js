const jwt = require('jsonwebtoken');

// Gera token com dados de exemplo
const token = jwt.sign(
  { username: 'admin' },      // dados que você quer salvar no token
  'chave_secreta',             // mesma chave do middleware
  { expiresIn: '1h' }          // expira em 1 hora
);

console.log("Seu token JWT é:\n", token);