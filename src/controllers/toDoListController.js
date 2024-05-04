const { v4: uuidv4 } = require("uuid");

const db = require("../configs/database");

const appendTodoConfig = (todos) =>
  todos.map((todo) => ({ ...todo, config: { is_delete_active: false } }));

const todoListController = {
  index: async (_, res) => {
    const raw = (await db()).query(
      "SELECT * FROM htmx1_todos ORDER BY created_at"
    );

    try {
      const todoList = (await raw).rows;

      (await db()).end();

      res.render("pages/toDoPage", { todoList: appendTodoConfig(todoList) });
    } catch (error) {
      (await db()).end();

      res.render("pages/toDoPage", { todoList: appendTodoConfig([]) });
    }
  },
  create: async (req, res) => {
    const name = req.body.name;

    (await db()).query(
      "INSERT INTO htmx1_todos (id, name, is_done) VALUES ($1, $2, false) RETURNING *",
      [uuidv4(), name]
    );

    // NOTE: better to be handled with refetch/append new item on client
    const raw = (await db()).query(
      "SELECT * FROM htmx1_todos ORDER BY created_at"
    );

    try {
      const todoList = (await raw).rows;

      (await db()).end();

      res.render("components/todos/toDoList", {
        todoList: appendTodoConfig(todoList),
      });
    } catch (error) {
      (await db()).end();

      res.render("components/todos/toDoList", {
        todoList: appendTodoConfig([]),
      });
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

      res.render("components/todos/toDoCheckbox", {
        todo: { ...todo, config: { is_delete_active: false } },
      });
    } catch (error) {
      (await db()).end();
    }
  },
  toggleDelete: async (req, res) => {
    const id = req.params.id;
    const is_delete_active = req.query.is_delete_active === "true";

    const raw = (await db()).query("SELECT * FROM htmx1_todos WHERE id = $1", [
      id,
    ]);

    try {
      const todo = (await raw).rows[0];

      (await db()).end();

      res.render("components/todos/toDoListItemText", {
        todo: { ...todo, config: { is_delete_active: !is_delete_active } },
      });
    } catch (error) {
      (await db()).end();
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;

    (await db()).query("DELETE FROM htmx1_todos WHERE id = $1", [id]);

    // NOTE: better to be handled with refetch/append new item on client
    const raw = (await db()).query(
      "SELECT * FROM htmx1_todos ORDER BY created_at"
    );

    try {
      const todoList = (await raw).rows;

      (await db()).end();

      res.render("components/todos/toDoList", {
        todoList: appendTodoConfig(todoList),
      });
    } catch (error) {
      (await db()).end();

      res.render("components/todos/toDoList", {
        todoList: appendTodoConfig([]),
      });
    }
  },
};

module.exports = todoListController;
