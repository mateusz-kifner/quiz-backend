const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/users");
const jwtAuth = require("../middleware/jwt-auth");

const singupUser = require("./users/singupUser");
const singinUser = require("./users/singinUser");
const getUser = require("./users/getUser");
const deleteUser = require("./users/deleteUser");
const patchUser = require("./users/patchUser");

router.get("/", jwtAuth.permission(0, 1), getUser);
router.get("/:userId", jwtAuth.permission(), getUser);
router.post("/singup", jwtAuth.permission(0, 2), singupUser);
router.post("/singin", singinUser);
router.delete("/:userId", jwtAuth.permission(), deleteUser);
router.patch("/:userId", jwtAuth.permission(), patchUser);

router.get(
  "/destroy_token/:userId&:userTokenIat",
  jwtAuth.permission(),
  (req, res, next) => {
    const _id = req.params.userId;
    const token_iat = req.params.userTokenIat;
    Users.findById(_id)
      .exec()
      .then(data => {
        for (token in data.tokens) {
          try {
            let token_data = jwt.decode(token);
            if (token_data.iat == token_iat) {
              jwtAuth.addToBlackList(token);
            }
          } catch {}
        }
      })
      .catch(err => next(err));
  }
);

module.exports = router;
