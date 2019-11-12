const Users = require("../../models/users");

module.exports = (req, res, next) => {
    const id = req.params.userId;
    Users.deleteOne({ _id: id })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => res.status(500).json({ error: err }));
};
