import axios from "axios";
import { getNotWordleCookie, setNotWordleCookie } from "../util/cookies";

//TODO: move to env variables
const HOST = "localhost";
const PORT = "3001";

//TODO: https
export const startNewGame = (length) => {
  const currentGameId = getNotWordleCookie();
  return new Promise((resolve, reject) => {
    axios
      .post(`http://${HOST}:${PORT}/new-game`, {
        length: length,
        currentGameId: currentGameId,
      })
      .then((response) => {
        const newGameId = response.data.newGameId;
        setNotWordleCookie(newGameId);
        resolve(newGameId);
      });
  });
};

export const makeGuess = (guess, gameId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`http://${HOST}:${PORT}/make-guess`, {
        guess: guess,
        gameId: gameId,
      })
      .then((res) => {
        const { response } = res.data;
        resolve(response);
      });
  });
};
