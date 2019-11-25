const express = require("express");

const PORT = 8080;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/goodbye", (req, res) => {
    res.send("Goodbye world");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});