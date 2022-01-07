import { Tile } from "./Tile";

export interface TileRowProps {}

export function TileRow(props: TileRowProps) {
  const tiles = [<Tile />, <Tile />, <Tile />, <Tile />, <Tile />];
  return <tr>{tiles}</tr>;
}
