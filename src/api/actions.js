import axios from "axios";

//TODO: move to env variables
const HOST = "localhost";
const PORT = "3001";

//TODO: https
export const startNewGame = (length) =>
  axios.post(`http://${HOST}:${PORT}/new-game`, { length: length });
