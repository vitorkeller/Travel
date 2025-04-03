var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/home', function (req, res, next) {
  res.render('home', { titulo: 'Página Inicial' });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.post('/login', async function (req, res, next) {
  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = await global.bd.buscarUsuario({ email, senha });
  if (usuario.usuEmail && usuario.usuEmail != "") {
    res.redirect('/home');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
