import { Tile } from "./Tile/Tile";
import { Component, useEffect, useState } from "react";
import { HIDDEN_CLASS } from "../App";
import { makeGuess } from "../api/actions";

export interface TileRowProps {
  length: number;
  active: boolean;
  gameHasStarted: boolean;
  rowIndex: number;
  gameId: string;
}

function buildEmptyArray(length: number, defaultValue: any = "") {
  let emptyArray: any[] = [];
  for (let i = 0; i < length; i++) {
    emptyArray = emptyArray.concat(defaultValue);
  }
  return emptyArray;
}

const buildEmptyLetterArray = (length: number) => buildEmptyArray(length);

const buildEmptyTileStatuses = (length: number) => buildEmptyArray(0);

export function TileRow({
  length = 5,
  active = false,
  gameHasStarted = false,
  rowIndex,
  gameId,
}: TileRowProps) {
  const [indexOfSelectedTile, setIndexOfSelectedTile] = useState(0);
  const [letters, setLetters] = useState(new Array<string>());
  const [tileStatuses, setTileStatuses] = useState(new Array<number>());
  const [rowDisabled, setRowDisabled] = useState(false);

  useEffect(() => {
    let defaultTileStatuses: number[] = buildEmptyTileStatuses(length);
    let defaultLetters: string[] = buildEmptyLetterArray(length);
    setLetters(defaultLetters);
    setTileStatuses(defaultTileStatuses);
  }, [length]);

  const handleTileValueChanged = (letter: string, indexOfTile: number) => {
    setIndexOfSelectedTile(indexOfSelectedTile + 1);
    letters[indexOfTile] = letter;
    setLetters(letters);
  };

  const handleTileClick = (tileIndex: number) => {
    setIndexOfSelectedTile(tileIndex);
  };

  const handleSubmitClick = async () => {
    setRowDisabled(true);
    const guessResponse: Array<number> = await makeGuess(letters, gameId);
    setTileStatuses(guessResponse);
  };

  let tiles: Array<JSX.Element> = [];
  for (let i = 0; i < length; i++) {
    tiles = tiles.concat(
      <Tile
        key={`row-${rowIndex}-tile-${i}`}
        disabled={!gameHasStarted || !active || rowDisabled}
        onInputChanged={(letter: string) => {
          handleTileValueChanged(letter, i);
        }}
        selected={active && indexOfSelectedTile === i}
        onTileClick={() => {
          handleTileClick(i);
        }}
        tileValue={letters[i]}
        status={tileStatuses[i]}
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
