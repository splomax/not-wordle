import { TileRow } from "./TileRow";
import { useState } from "react";
import { Tile } from "./Tile";

export interface TableProps {
  puzzleLength?: number;
}

export function Table({ puzzleLength = 5 }: TableProps) {
  const [indexOfSelectedRow, setIndexOfSelectedRow] = useState(0);
  let tileRows: Array<JSX.Element> = [];
  for (let i = 0; i < puzzleLength; i++) {
    tileRows = tileRows.concat(
      <TileRow length={puzzleLength} active={indexOfSelectedRow === i} />
    );
  }
  return <table>{tileRows}</table>;
}
