const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");

const isEmpty = require("../utils/isEmpty");

/**
 * @route   GET /api/todo
 * @desc    Get all todos
 * @access  Public
 */
router.get("/", (req, res) => {
  Todo.find()
    .sort({ date: -1 })
    .then(todos => {
      if (!todos || Object.keys(todos).length === 0) {
        return res.status(404).json({ todo: "No item to show." });
      }
      res.json(todos);
    })
    .catch(err => res.status(400).json(err));
});

/**
 * @route   POST /api/todo
 * @desc    Add new todo
 * @access  Public
 */
router.post("/", (req, res) => {
  const { text } = req.body;
  if (isEmpty(text)) {
    return res.status(400).json({ todo: "Text is required." });
  }
  const newTodo = new Todo({
    text
  });

  newTodo
    .save()
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ todo: err }));
});

/**
 * @route   POST /api/todo/switch/:todoId
 * @desc    Switch complete status of individual todo
 * @access  Public
 */
router.post("/switch/:todoId", (req, res) => {
  Todo.findById(req.params.todoId).then(todo => {
    if (!todo) {
      return res.status(404).json({ todo: "No item under this id." });
    }
    const currentStatus = todo.completed;
    todo.completed = !currentStatus;
    todo
      .save()
      .then(todo => res.json(todo))
      .catch(err => res.status(400).json(err));
  });
});

/**
 * @route   POST /api/todo/update/:todoId
 * @desc    Upate text info of individual todo
 * @access  Public
 */
router.post("/update/:todoId", (req, res) => {
  Todo.findById(req.params.todoId).then(todo => {
    if (!todo) {
      return res.status(404).json({ todo: "No item under this id." });
    }
    // new text
    const { text } = req.body;
    if (isEmpty(text)) {
      return res.status(400).json({ todo: "Text is required." });
    }
    if (text === todo.text) {
      return res.status(400).json({ todo: "No text change for this item." });
    }
    todo.text = text;
    todo
      .save()
      .then(todo => res.json({ todo: "success" }))
      .catch(err => res.status(400).json(err));
  });
});

/**
 * @route   DELETE /api/todo/:todoId
 * @desc    Delete individual todo
 * @access  Public
 */
router.delete("/:todoId", (req, res) => {
  Todo.findById(req.params.todoId).then(todo => {
    if (!todo) {
      return res.status(404).json({ todo: "No item under this id." });
    }

    todo
      .remove()
      .then(todo => res.json(todo))
      .catch(err => res.status(400).json(err));
  });
});

module.exports = router;
