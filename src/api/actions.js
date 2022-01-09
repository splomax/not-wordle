import axios from "axios";

//TODO: move to env variables
const HOST = "localhost";
const PORT = "3001";

//axios.get(`${host}:${port}/api/categories`)
export const startNewGame = () => axios.post(`http://${HOST}:${PORT}/new-game`);
