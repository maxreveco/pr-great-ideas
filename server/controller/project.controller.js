const { json } = require('express');
const Project = require('../model/project.model');

module.exports.crear = (req, res) => {
    Project.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.editar = (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.eliminar = (req,res) => {
    Project.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.listar = (req, res) => {
    Project.find().sort({dueDate: 1}) //Ordena alfabeticamente ascendente
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.buscarPorId = (req, res) => {
    Project.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}



