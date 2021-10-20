const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/projects", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Conexion a la base de datos establecida"))
    .catch(err => console.log("No se pudo establecer conexion a la base de datos", err))