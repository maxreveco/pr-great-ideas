const PostController = require('../controller/post.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/new', authenticate, PostController.crear);
    app.get('/api/post', authenticate, PostController.listar);
    app.get('/api/post/:id', authenticate, PostController.buscarPorId);
    app.put('/api/post/:id', authenticate, PostController.editar);
    app.delete('/api/post/:id', authenticate, PostController.eliminar);
    app.get('/api/userLikes/:id', authenticate, PostController.contarLikesUser);
    app.get('/api/userPosts/:id', authenticate, PostController.contarPostsUser);
}