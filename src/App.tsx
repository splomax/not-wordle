import React, { useState } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { startNewGame } from "./api/actions";

export const HIDDEN_CLASS = "hidden";

function App() {
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const handleNewGameButtonClick = () => {
    startNewGame()
      .then(() => {
        setGameHasStarted(true);
      })
      .catch(() => {
        setGameHasStarted(false);
        //TODO error case
      });
  };
  return (
    <div className="app-container">
      <button onClick={handleNewGameButtonClick}>New Game</button>
      <Table gameHasStarted={gameHasStarted} />
    </div>
  );
}

export default App;
