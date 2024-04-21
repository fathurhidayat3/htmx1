const db = require("../configs/database");

const todoListController = {
  index: async (_, res) => {
    const raw = (await db()).query("SELECT * from htmx1_todos");

    try {
      const todoList = (await raw).rows;

      (await db()).end();

      res.render("todos/toDoList", { todoList });
    } catch (error) {
      (await db()).end();

      res.render("todos/toDoList", { todoList: [] });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const isDone = req.body.is_done || false;

    const raw = (await db()).query(
      "UPDATE htmx1_todos SET is_done = $1 WHERE id = $2 RETURNING is_done",
      [isDone, id]
    );

    try {
      const todo = (await raw).rows[0];

      (await db()).end();

      res.render("todos/toDoInput", { todo });
    } catch (error) {
      (await db()).end();
    }
  },
};

module.exports = todoListController;
