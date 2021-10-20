const UserController = require('../controller/user.controller');

module.exports = (app) => {
    app.post('/api/registry', UserController.registrar);
    app.post('/api/login', UserController.login);
}