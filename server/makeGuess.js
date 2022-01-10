const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const csv = require("fast-csv");

async function getExistingGame(gameId) {
  let word, numberOfGuesses;
  let queryParameter = () =>
    new Promise((resolve) => {
      let returnLit = [];
      csv
        .parseFile(`games/${gameId}.csv`, { headers: false })
        .on("data", (data) => {
          word = data[0];
          numberOfGuesses = data[1];
        })
        .on("end", () => {
          resolve({ word, numberOfGuesses });
        });
    });
  return queryParameter();
}

function buildCharacterPositionLookupForWord(word) {
  let characterPositionLookup = {};
  for (let i = 0; i < word.length; i++) {
    const letter = word.charAt(i);
    let existingPositionArray = characterPositionLookup[letter];
    const newPositionArray = existingPositionArray
      ? existingPositionArray.concat(i)
      : [i];
    characterPositionLookup[letter] = newPositionArray;
  }
  return characterPositionLookup;
}

const INITIALIZED = -1;
const INCORRECT = 1;
const CORRECT_LETTER_WRONG_PLACE = 2;
const CORRECT = 3;

function buildEmptyArrayOfLength(length) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result = result.concat(INITIALIZED);
  }
  return result;
}

function buildCharacterCountLookupForWord(word) {
  let characterCountLookup = {};
  for (let letter of word) {
    if (characterCountLookup[letter]) {
      characterCountLookup[letter] = characterCountLookup[letter] + 1;
    } else {
      characterCountLookup[letter] = 1;
    }
  }
  return characterCountLookup;
}

function generateResponse(solution, guess) {
  let response = buildEmptyArrayOfLength(guess.length);
  const characterCountLookupForSolution =
    buildCharacterCountLookupForWord(solution);
  for (let i = 0; i < guess.length; i++) {
    const guessLetter = guess[i];
    const solutionLetter = solution[i];
    const occurrencesOfCharacterInSolution =
      characterCountLookupForSolution[guessLetter];
    console.log(`character: ` + guessLetter);
    console.log(`count: ${occurrencesOfCharacterInSolution}`);
    if (
      !solution.includes(guessLetter) ||
      occurrencesOfCharacterInSolution === 0
    ) {
      response[i] = INCORRECT;
    } else {
      if (guessLetter == solutionLetter) {
        response[i] = CORRECT;
      } else if (occurrencesOfCharacterInSolution) {
        response[i] = CORRECT_LETTER_WRONG_PLACE;
      }
      characterCountLookupForSolution[guessLetter] =
        occurrencesOfCharacterInSolution - 1;
    }
  }
  return response;
}

async function makeGuess(guess, gameId) {
  const { word, numberOfGuesses } = await getExistingGame(gameId);
  return generateResponse(word, guess.join(""));
}

exports.makeGuess = makeGuess;
