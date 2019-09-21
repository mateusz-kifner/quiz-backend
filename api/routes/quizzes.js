const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quiz = require("../models/quizzes");

router.get("/", (req, res, next) => {
    Quiz.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => res.status(500).json({ error: err }));
});

router.get("/:quizId", (req, res, next) => {
    const id = req.params.quizId;
    Quiz.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    error: { message: "user_dataect with given Id not found" }
                });
            }
        })
        .catch(err =>
            res.status(500).json({
                error: err
            })
        );
});

router.post("/", (req, res, next) => {
    const quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc
    });
    quiz.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "quiz Added",
        addedQuiz: quiz
    });
});

router.delete("/:quizId", (req, res, next) => {
    const id = req.params.quizId;
    Quiz.remove({ _id: id })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => res.status(500).json({ error: err }));
});

router.patch("/:quizId", (req, res, next) => {
    const id = req.params.quizId;
    const update = {};
    for (const user_data of req.body) {
        update[user_data.propName] = user_data.value;
    }
    Quiz.update({ _id: id }, { $set: update })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
