import { Tile } from "./Tile";
import { Component, useState } from "react";
import { HIDDEN_CLASS } from "../App";
import { makeGuess } from "../api/actions";

export interface TileRowProps {
  length: number;
  active: boolean;
  gameHasStarted: boolean;
  rowIndex: number;
  gameId: string;
}

function buildEmptyLetterArray(length: number) {
  let defaultLetters: string[] = [];
  for (let i = 0; i < length; i++) {
    defaultLetters = defaultLetters.concat("");
  }
  return defaultLetters;
}

export function TileRow({
  length = 5,
  active = false,
  gameHasStarted = false,
  rowIndex,
  gameId,
}: TileRowProps) {
  const [indexOfSelectedTile, setIndexOfSelectedTile] = useState(0);
  let defaultLetters: string[] = buildEmptyLetterArray(length);
  const [letters, setLetters] = useState(defaultLetters);

  const handleTileValueChanged = (letter: string, indexOfTile: number) => {
    setIndexOfSelectedTile(indexOfSelectedTile + 1);
    letters[indexOfTile] = letter;
    setLetters(letters);
  };

  const handleTileClick = (tileIndex: number) => {
    setIndexOfSelectedTile(tileIndex);
  };

  const handleSubmitClick = async () => {
    debugger;
    await makeGuess(letters, gameId);
  };

  let tiles: Array<JSX.Element> = [];
  for (let i = 0; i < length; i++) {
    tiles = tiles.concat(
      <Tile
        key={`row-${rowIndex}-tile-${i}`}
        disabled={!gameHasStarted || !active}
        onInputChanged={(letter: string) => {
          handleTileValueChanged(letter, i);
        }}
        selected={active && indexOfSelectedTile === i}
        onTileClick={() => {
          handleTileClick(i);
        }}
        tileValue={letters[i]}
      />
    );
  }

  tiles = tiles.concat(
    <td key={`row-${rowIndex}-submit-button`}>
      <button
        disabled={indexOfSelectedTile < length}
        onClick={handleSubmitClick}
      >
        &#x2192;
      </button>
    </td>
  );
  return <tr>{tiles}</tr>;
}
