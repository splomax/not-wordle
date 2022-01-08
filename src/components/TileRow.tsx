import { Tile } from "./Tile";
import { Component, useState } from "react";

export interface TileRowProps {
  length: number;
  active: boolean;
}

export function TileRow({ length = 5, active = false }: TileRowProps) {
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
        onInputChanged={handleTileValueChanged}
        selected={active && indexOfSelectedTile === i}
        onTileClick={() => {
          handleTileClick(i);
        }}
      />
    );
  }
  tiles = tiles.concat(
    <button disabled={indexOfSelectedTile < length}>&#x2192;</button>
  );
  return <tr>{tiles}</tr>;
}
