import React, { KeyboardEventHandler, useState } from "react";

export interface TileProps {
  letter: string;
  status: TileStatus;
  selected: boolean;
}

export enum TileStatus {
  Open = 0,
  Incorrect,
  CorrectLetterWrongPlace,
  Correct,
}

const backgroundClassByStatus = {
  [TileStatus.Open]: "tile-open",
  [TileStatus.Incorrect]: "tile-incorrect",
  [TileStatus.CorrectLetterWrongPlace]: "tile-correct-letter-wrong-place",
  [TileStatus.Correct]: "tile-correct",
};

export function Tile<TileProps>({
  letter = "",
  status = TileStatus.Open,
  selected = false,
}) {
  const [tileValue, setTileValue] = useState("");

  const handleUserInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const pressedKey: string = e.key;
    if (pressedKey) {
      setTileValue(pressedKey);
    }
  };

  return (
    <td>
      <input
        maxLength={1}
        className={backgroundClassByStatus[status]}
        value={tileValue}
        onKeyDown={handleUserInput}
      ></input>
    </td>
  );
}
