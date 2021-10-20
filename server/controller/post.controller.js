const { json } = require('express');
const Post = require('../model/post.model');

module.exports.crear = (req, res) => {
    Post.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.editar = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.eliminar = (req,res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.listar = (req, res) => {
    Post.find().sort({likes: -1}) //Ordena los post con likes de mayor a menor
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.buscarPorId = (req, res) => {
    Post.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}



