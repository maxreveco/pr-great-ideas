const { json } = require('express');
const { isValidObjectId } = require('mongoose');
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

module.exports.eliminar = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.listar = (req, res) => {
    Post.find().sort({ likes: -1 }) //Ordena los post con likes de mayor a menor
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.buscarPorId = (req, res) => {
    Post.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.contarLikesUser = (req, res) => {
    Post.aggregate([
        { "$match": { "userLikes.id": { "$eq": req.params.id } } },
        {
            $project:
            {
                userLikes:
                {
                    $filter:
                    {
                        input: "$userLikes",
                        as: "like",
                        cond: { $eq: ["$$like.id", req.params.id] }
                    }
                }
            }
        }])
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.contarPostsUser = (req, res) => {
    Post.aggregate([
        { "$match": { "id_user": { "$eq": req.params.id } } }])
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}



