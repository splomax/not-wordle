import { TileRow } from "./TileRow";

export interface TableProps {}

export function Table(props: TableProps) {
  const tileRows = [
    <TileRow />,
    <TileRow />,
    <TileRow />,
    <TileRow />,
    <TileRow />,
    <TileRow />,
  ];
  return <table>{tileRows}</table>;
}
