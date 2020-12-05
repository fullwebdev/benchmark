export interface DataRowElement extends HTMLTableRowElement {
  setLabel(label: string): void;
  data_id: number;
}

export interface Data {
  id: number;
  label: string;
}
