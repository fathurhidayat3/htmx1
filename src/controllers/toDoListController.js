const { v4: uuidv4 } = require("uuid");

const db = require("../configs/database");

const todoListController = {
  index: async (_, res) => {
    const raw = (await db()).query("SELECT * from htmx1_todos ORDER BY name");

    try {
      const todoList = (await raw).rows;

      (await db()).end();

      res.render("pages/toDoPage", { todoList });
    } catch (error) {
      (await db()).end();

      res.render("pages/toDoPage", { todoList: [] });
    }
  },
  create: async (req, res) => {
    const name = req.body.name;

    (await db()).query(
      "INSERT INTO htmx1_todos (id, name, is_done) VALUES ($1, $2, false) RETURNING *",
      [uuidv4(), name]
    );

    // NOTE: better to be handled with refetch/append new item on client
    const raw = (await db()).query("SELECT * from htmx1_todos ORDER BY name");

    try {
      const todoList = (await raw).rows;

      (await db()).end();

      res.render("components/todos/toDoList", { todoList });
    } catch (error) {
      (await db()).end();

      res.render("components/todos/toDoList", { todoList: [] });
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

      res.render("components/todos/toDoCheckbox", { todo });
    } catch (error) {
      (await db()).end();
    }
  },
};

module.exports = todoListController;
