import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

export interface TileProps {
  status?: TileStatus;
  selected: boolean;
  onInputChanged: Function;
  onTileClick: MouseEventHandler;
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

export function Tile({
  status = TileStatus.Open,
  selected = false,
  onInputChanged,
  onTileClick,
}: TileProps) {
  const [tileValue, setTileValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (selected) {
      // @ts-ignore
      inputRef?.current?.focus();
    }
  }, [selected]);

  const handleUserInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const pressedKey: string = e.key;
    if (pressedKey) {
      setTileValue(pressedKey);
      onInputChanged(pressedKey);
    }
  };

  return (
    <td>
      <input
        ref={inputRef}
        maxLength={1}
        className={backgroundClassByStatus[status]}
        value={tileValue}
        onKeyDown={handleUserInput}
        onClick={onTileClick}
      ></input>
    </td>
  );
}
