import axios from "axios";
import { getNotWordleCookie, setNotWordleCookie } from "../util/cookies";

//TODO: move to env variables
const HOST = "localhost";
const PORT = "3001";

//TODO: https
export const startNewGame = (length) => {
  const currentGameId = getNotWordleCookie();
  return axios
    .post(`http://${HOST}:${PORT}/new-game`, {
      length: length,
      currentGameId: currentGameId,
    })
    .then((response) => {
      debugger;
      setNotWordleCookie(response.data.newGameId);
    });
};
