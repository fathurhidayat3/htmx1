const express = require("express");

const router = express.Router();

router.get("/ping", (_, res) => {
  res.render("ping", { ping: "ping" });
});

router.post("/ping", (_, res) => {
  res.send("pong");
});

module.exports = router;
