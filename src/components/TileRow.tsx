import { Tile } from "./Tile";
import { Component, useState } from "react";
import { HIDDEN_CLASS } from "../App";

export interface TileRowProps {
  length: number;
  active: boolean;
  gameHasStarted: boolean;
  rowIndex: number;
}

export function TileRow({
  length = 5,
  active = false,
  gameHasStarted = false,
  rowIndex,
}: TileRowProps) {
  const [indexOfSelectedTile, setIndexOfSelectedTile] = useState(0);

  const handleTileValueChanged = (tileValue: string) => {
    //TODO: do something with tile value?
    setIndexOfSelectedTile(indexOfSelectedTile + 1);
    if (indexOfSelectedTile === length - 1) {
    }
  };

  const handleTileClick = (tileIndex: number) => {
    setIndexOfSelectedTile(tileIndex);
  };

  let tiles: Array<JSX.Element> = [];
  for (let i = 0; i < length; i++) {
    tiles = tiles.concat(
      <Tile
        key={`row-${rowIndex}-tile-${i}`}
        disabled={!gameHasStarted || !active}
        onInputChanged={handleTileValueChanged}
        selected={active && indexOfSelectedTile === i}
        onTileClick={() => {
          handleTileClick(i);
        }}
      />
    );
  }

  tiles = tiles.concat(
    <td key={`row-${rowIndex}-submit-button`}>
      <button disabled={indexOfSelectedTile < length}>&#x2192;</button>
    </td>
  );
  return <tr>{tiles}</tr>;
}
