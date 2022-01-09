import { TileRow } from "./TileRow";
import { useState } from "react";
import { Tile } from "./Tile";

export interface TableProps {
  puzzleLength?: number;
  gameHasStarted: boolean;
}

export function Table({
  puzzleLength = 5,
  gameHasStarted = false,
}: TableProps) {
  const [indexOfSelectedRow, setIndexOfSelectedRow] = useState(0);
  let tileRows: Array<JSX.Element> = [];
  for (let i = 0; i < puzzleLength; i++) {
    tileRows = tileRows.concat(
      <TileRow
        rowIndex={i}
        key={`tile-row-${i}`}
        gameHasStarted={gameHasStarted}
        length={puzzleLength}
        active={indexOfSelectedRow === i}
      />
    );
  }
  return (
    <table>
      <tbody>{tileRows}</tbody>
    </table>
  );
}
