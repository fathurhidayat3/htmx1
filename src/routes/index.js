const express = require("express");

const todoListController = require("../controllers/toDoListController");

const router = express.Router();

router.get("/", todoListController.index);
router.post("/todos", todoListController.create);
router.put("/todos/:id", todoListController.update);

module.exports = router;
