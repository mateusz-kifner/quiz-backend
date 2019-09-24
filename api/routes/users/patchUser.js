const Users = require("../../models/users");
const error = require("../../error");

module.exports = (req, res, next) => {
    const id = req.params.userId;
    const update = {};
    for (const user_data of req.body) {
        update[user_data.key] = user_data.value;
    }
    Users.update({ _id: id }, { $set: update })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => error("Could not update user", 500, err));
};
