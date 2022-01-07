import { Tile } from "./Tile";
import { useState } from "react";

export interface TileRowProps {
  length: number;
}

export function TileRow<TileRowProps>({ length = 5 }) {
  const [indexOfSelectedTile, setIndexOfSelectedTile] = useState(-1);
  const tiles = [<Tile />, <Tile />, <Tile />, <Tile />, <Tile />];
  for (let i = 0; i < length; i++) {
    tiles += <Tile
  }
  return <tr>{tiles}</tr>;
}
