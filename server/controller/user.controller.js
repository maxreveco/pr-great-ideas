const User = require('../model/user.model');
const jwtconfig = require('../config/jwt.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.registrar = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(data => {
            if (!data) {
                User.create(req.body)
                    .then(user => res.json(user))
                    .catch(errors => {
                        res.status(500).json(errors)
                    });
            } else {
                res.status(500).json({
                    errors: {
                        email: {
                            name: 'ValidatorError',
                            message: 'El correo ya se encuentra registrado'
                        }
                    }
                })
            }
        });
}

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(resp => {
            if (resp) {
                bcrypt.compare(req.body.password, resp.password)
                    .then(valid => {
                        if (valid) {
                            const payload = {
                                id: resp._id,
                                firstName: resp.firstName,
                                alias: resp.alias,
                                email: resp.email
                            };
                            const newToken = jwt.sign(payload, jwtconfig.secret);
                            res.cookie("usertoken", newToken, jwtconfig.secret, { httpOly: true })
                                .json({ success: true, user: payload });
                        } else {
                            res.status(500).json({ message: "Password es invalido" });
                        }
                    })
            } else {
                res.status(500).json({ message: "Usuario no existe" });
            }
        })
}
module.exports.listar = (req, res) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}