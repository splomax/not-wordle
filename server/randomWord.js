const axios = require("axios").default;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUV";
const API_ENDPOINT = "https://api.datamuse.com/words?sp=";

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomLetter() {
  return alphabet[getRandomNumber(26)];
}

function buildQueryString(length) {
  //get two random indexes into our query string
  const letterPosition = getRandomNumber(length);

  //get random consoant and vowel
  const randomConsonant = getRandomLetter();

  //build query string
  let queryString = "";
  for (let i = 0; i < length; i++) {
    if (i === letterPosition) {
      queryString += randomConsonant;
    } else {
      queryString += "?";
    }
  }

  return queryString;
}

function makeRequestToApi(queryString) {
  return axios.get(`${API_ENDPOINT}${queryString}`).then((res) => {
    return res.data;
  });
}

function getRandomTopTenWordFromApiResponse(apiResponse) {
  //return one of the top 10 words
  const max = apiResponse.length >= 10 ? 10 : apiResponse.length;
  const randomIndex = getRandomNumber(max);
  const { word } = apiResponse[randomIndex];
  return word;
}

async function getRandomWord(length) {
  let apiResponse;
  let word;
  do {
    const queryString = buildQueryString(length);
    apiResponse = await makeRequestToApi(queryString);
    if (apiResponse.length > 0) {
      word = getRandomTopTenWordFromApiResponse(apiResponse);
    }
    //if there fewer than five words, it's probably not a great pattern
    //also, some words have spaces in them (no bueno)
  } while (apiResponse.length < 5 || (word && word.includes(" ")));
  return word;
}

exports.getRandomWord = getRandomWord;
