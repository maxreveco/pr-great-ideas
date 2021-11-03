const UserController = require('../controller/user.controller');

module.exports = (app) => {
    app.post('/api/registry', UserController.registrar);
    app.post('/api/login', UserController.login);
    app.get('/api/listado', UserController.listar);
    app.get('/api/listado/:id', UserController.buscarPorId);
}