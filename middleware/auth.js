const jwt = require('jsonwebtoken');

// Middleware que verifica se o token é válido
const auth = (req, res, next) => {
  // Pega o token do header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, 'chave_secreta'); // chave_secreta = segredo da API
    req.user = decoded; // salva os dados do token no req.user
    next(); // segue para o controller
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = auth;