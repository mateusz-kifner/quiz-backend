const Users = require("../../models/users");
const error = require("../../error");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    bcrypt.hash(req.body.password, 11, (err, hash) => {
        if (err) {
            return error("Users creation Error");
        } else {
            const user = new Users({
                _id: new mongoose.Types.ObjectId(),
                login: req.body.login,
                password: hash,
                email: req.body.email,
                permission: req.body.permission
            });
            user.save()
                .then(result => {
                    var { login, _id } = user;
                    res.status(201).json({
                        message: "user Added",
                        addedUsers: { login, _id }
                    });
                })
                .catch(err => {
                    return error("Users creation Error");
                });
        }
    });
};
