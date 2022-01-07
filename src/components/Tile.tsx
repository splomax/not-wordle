export interface TileProps {
  letter: string;
  status: TileStatus;
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

export function Tile<TileProps>({ letter = "", status = TileStatus.Open }) {
  return (
    <td>
      <input className={backgroundClassByStatus[status]}></input>
    </td>
  );
}
