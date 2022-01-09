const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const csv = require("fast-csv");
const randomWord = require("random-word-by-length");

function removeOldGame(gameId) {
  fs.unlink(`games/${gameId}.csv`, (err) => {
    if (err) {
      //don't care
      return;
    }
  });
}

function getWordOfLength(length) {
  let word;
  do {
    word = randomWord(length);
  } while (word.length !== length);
  return word;
}

function writeNewGameFile(currentGameId, newWord) {
  const csvStream = csv.format();
  const writeStream = fs.createWriteStream(`games/${uuid}.csv`);
  csvStream.pipe(writeStream).on("end", () => process.exit());
  csvStream.write({ word: newWord, numberOfGuesses: 0 });
  csvStream.end();
}

export default function newGame(currentGameId, wordLength) {
  if (currentGameId) {
    removeOldGame(currentGameId);
  }
  const newGameId = uuidv4();
  const newWord = getWordOfLength(wordLength);
  writeNewGameFile(newGameId, newWord);
  return newGameId;
}
