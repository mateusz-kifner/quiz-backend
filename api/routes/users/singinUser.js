const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../../models/users");
const error = require("../../error");
const jwtAuth = require("../../middleware/jwt-auth");

module.exports = (req, res, next) => {
    Users.findOne({ login: req.body.login })
        .exec()
        .then(user => {
            var { _id, login, password, permission, tokens } = user;
            bcrypt.compare(req.body.password, password, (err, success) => {
                if (success) {
                    const token = jwt.sign(
                        {
                            _id,
                            login,
                            permission
                        },
                        process.env.JWT_KEY,
                        { expiresIn: "1h" }
                    );
                    tokens = jwtAuth.removeNotValid(tokens);
                    tokens.push(token);
                    Users.updateOne({ _id }, { tokens })
                        .exec()
                        .catch(err => {
                            error(
                                "Auth failed, Could not add token to db",
                                500,
                                err
                            );
                        });

                    res.status(201).json({
                        message: "Auth succesful",
                        _id,
                        login,
                        token,
                        permission
                    });
                } else {
                    next(error("Auth failed", 401));
                }
            });
        })
        .catch(err => {
            next(error("Auth failed", 401));
        });
};
