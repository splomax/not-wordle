const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const csv = require("fast-csv");
const { getRandomWord } = require("./randomWord");

function removeOldGame(gameId) {
  fs.unlink(`games/${gameId}.csv`, (err) => {
    if (err) {
      //don't care
      return;
    }
  });
}

function writeNewGameFile(newGameId, newWord) {
  const csvStream = csv.format();
  const writeStream = fs.createWriteStream(`games/${newGameId}.csv`);
  csvStream.pipe(writeStream).on("end", () => process.exit());
  csvStream.write({ word: newWord, numberOfGuesses: 0 });
  csvStream.end();
}

async function createNewGame(currentGameId, wordLength) {
  if (currentGameId) {
    removeOldGame(currentGameId);
  }
  const newGameId = uuidv4();
  const newWord = await getRandomWord(wordLength);
  writeNewGameFile(newGameId, newWord);
  console.log(newWord);
  return newGameId;
}

exports.newGame = createNewGame;
