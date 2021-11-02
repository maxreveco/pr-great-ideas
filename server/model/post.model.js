const { text } = require('express');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: [true, "No se ha guardado el id de usuario"]
    },
    aliasUser: {
        type: String
    },
    content: {
        type: String,
        required: [true, "El post debe tener contenido"]
    },
    countLikes: {
        type: Number,
        default: 0
    },
    userLikes: [

    ],
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

