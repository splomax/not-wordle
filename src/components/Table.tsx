import { TileRow } from "./TileRow";
import { useState } from "react";
import { Tile } from "./Tile";

export interface TableProps {
  puzzleLength?: number;
  gameHasStarted: boolean;
  gameId: string;
}

export function Table({
  puzzleLength = 5,
  gameHasStarted = false,
  gameId,
}: TableProps) {
  const [indexOfSelectedRow, setIndexOfSelectedRow] = useState(0);
  let tileRows: Array<JSX.Element> = [];
  for (let i = 0; i < puzzleLength; i++) {
    tileRows = tileRows.concat(
      <TileRow
        gameId={gameId}
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
