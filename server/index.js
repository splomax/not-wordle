const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { newGame } = require("./newGame");
const { makeGuess } = require("./makeGuess");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    //TODO: restrict origin
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.post("/new-game", async (req, res) => {
  const length = parseInt(req.body.length);
  const currentGameId = req.body.currentGameId;
  const newGameId = await newGame(currentGameId, length);
  res.json({ newGameId: newGameId });
});

app.put("/make-guess", async (req, res) => {
  const response = await makeGuess(req.body.guess, req.body.gameId);
  console.log("returning: " + response);
  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
