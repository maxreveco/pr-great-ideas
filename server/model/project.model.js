const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    project:{
        type:String,
        required: [true, "El nombre del proyecto es requerido para guardar registro"],
        minlength:[3,"El nombre del proyecto debe contener al menos 3 caracteres"]
    },
    dueDate:{
        type:Date,
        required: [true, "La fecha del proyecto es requerida para guardar el registro"]
    },
    projectState:{
        type:Number
    }
}, { timestamps:true })

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;

