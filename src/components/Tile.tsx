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

const lettersRegEx: RegExp = /^[a-zA-Z]+$/;

const characterIsLetter = (letter: string) => lettersRegEx.test(letter);
const stringIsOneCharacter = (testString: string) => testString.length == 1;
const inputIsValid = (input: string) =>
  characterIsLetter(input) && stringIsOneCharacter(input);

export function Tile<TileProps>({
  letter = "",
  status = TileStatus.Open,
  selected = false,
}) {
  const [tileValue, setTileValue] = useState("");

  const handleUserInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const pressedKey: string = e.key;
    if (pressedKey && inputIsValid(pressedKey)) {
      setTileValue(pressedKey);
    }
  };

  return (
    <td>
      <input
        className={backgroundClassByStatus[status]}
        value={tileValue}
        onKeyDown={handleUserInput}
      ></input>
    </td>
  );
}
