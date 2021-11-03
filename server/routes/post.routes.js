const PostController = require('../controller/post.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/new', PostController.crear);
    app.get('/api/post', PostController.listar);
    app.get('/api/post/:id', PostController.buscarPorId);
    app.put('/api/post/:id', PostController.editar);
    app.delete('/api/post/:id', PostController.eliminar);
    app.get('/api/userLikes/:id', PostController.contarLikesUser);
    app.get('/api/userPosts/:id', PostController.contarPostsUser);
}