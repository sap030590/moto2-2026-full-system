const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.json({ status: "OK" }));

app.get("/standings", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./standings.json", "utf8"));
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log("Server running"));
