import React, { useState } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { startNewGame } from "./api/actions";
import { getNotWordleCookie } from "./util/cookies";

export const HIDDEN_CLASS = "hidden";

function App() {
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [puzzleLength, setPuzzleLength] = useState(5);
  const [gameId, setGameId] = useState(getNotWordleCookie());
  const handleNewGameButtonClick = () => {
    startNewGame(puzzleLength)
      .then((newGameId) => {
        setGameId(newGameId);
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
      Length:
      <input
        value={puzzleLength}
        onChange={(event) => {
          // @ts-ignore
          setPuzzleLength(event.target.value);
        }}
      />
      <Table
        gameId={gameId}
        puzzleLength={puzzleLength}
        gameHasStarted={gameHasStarted}
      />
    </div>
  );
}

export default App;
