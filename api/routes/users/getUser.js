const Users = require("../../models/users");

module.exports = (req, res, next) => {
    const id = req.params.userId;
    if (id) {
        Users.findById(id)
            .select("-password -tokens")
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({
                        error: { message: "Users with given Id not found" }
                    });
                }
            })
            .catch(err => next(err));
    } else {
        Users.find()
            .select("_id login")
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json(doc);
                } else {
                }
            })
            .catch(err => next(err));
    }
};
