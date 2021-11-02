const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Campo nombre es requerido"]
    },
    lastName: {
        type: String,
        required: [true, "Campo apellido es requerido"]
    },
    email: {
        type: String,
        required: [true, "Campo email es requerido"],
        validate: [/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/, "Email invalido"]
    },
    password: {
        type: String,
        required: [true, "Campo password es requerido"],
        minlength: [8, "Campo debe tener al menos 8 caracteres"]
    },
    numberPosts: {
        type: Number,
        default: 0
    },
    numberLikes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords deben ser identicos');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;