const { text } = require('express');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    id_user:{
        type:String,
        required:[true, "No se ha guardado el id de usuario"]
    },
    content:{
        type:String,
        required: [true, "La fecha del proyecto es requerida para guardar el registro"]
    },
    likes:[

    ],
}, { timestamps:true })

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

