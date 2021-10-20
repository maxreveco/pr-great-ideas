const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http:localhost:3000'
}));

app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

require('./routes/user.routes')(app);
require('./routes/post.routes')(app);

require('./config/mongoose.config');

const server = app.listen(8000, () => console.log('Servidor escuchando en el puerto 8000'));