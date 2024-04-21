const db = require("../configs/database");

const todoListController = {
  index: async (_, res) => {
    const todoList = await db
      .multi("SELECT * from htmx1_todos")
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        return error;
      });

    res.render("toDoList", { todoList });
  },
  update: async (req, res) => {
    const id = req.params.id;
    const isDone = req.body.is_done || false;

    const todo = await db
      .task((t) => {
        return t.one(
          "UPDATE htmx1_todos SET is_done = $1 WHERE id = $2 RETURNING is_done",
          [isDone, id]
        );
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });

    if (todo.is_done) {
      res.send(`
        <input
          type="checkbox"
          name="is_done"
          value=${!todo.is_done}
          checked
          hx-put="/todos/${id}"
          hx-target="this"
          hx-swap="outerHTML"/>
    `);
    } else {
      res.send(`
        <input
          type="checkbox"
          name="is_done"
          value="${!todo.is_done}"
          hx-put="/todos/${id}"
          hx-target="this"
          hx-swap="outerHTML"/>
    `);
    }
  },
};

module.exports = todoListController;
