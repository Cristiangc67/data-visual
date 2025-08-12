export interface CSVDataRow extends Record<string, string | number | boolean> {}

export interface TableProps {
  headers: string[];
  data: CSVDataRow[];
}
