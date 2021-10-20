const ProjectController = require('../controller/project.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/new', ProjectController.crear);
    app.get('/api/project', ProjectController.listar);
    app.get('/api/project/:id', authenticate, ProjectController.buscarPorId);
    app.put('/api/project/:id', authenticate, ProjectController.editar);
    app.delete('/api/project/:id', authenticate, ProjectController.eliminar);
}