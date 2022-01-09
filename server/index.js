const express = require("express");
const cors = require("cors");
const randomWord = require("random-word-by-length");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const csv = require("fast-csv");

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

function getWordOfLength(length) {
  let word;
  do {
    word = randomWord(length);
  } while (word.length !== length);
  return word;
}

//TODO: if user already had game in progress, delete it
app.post("/new-game", async (req, res) => {
  const length = parseInt(req.body.length);
  const word = getWordOfLength(length);
  const data = { word: "asdf", numberOfGuesses: 0 };
  const uuid = uuidv4();
  const csvStream = csv.format();
  const writeStream = fs.createWriteStream(`games/${uuid}.csv`);
  csvStream.pipe(writeStream).on("end", () => process.exit());
  csvStream.write({ word: word, numberOfGuesses: 0 });
  csvStream.end();
  //respond with guid
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
