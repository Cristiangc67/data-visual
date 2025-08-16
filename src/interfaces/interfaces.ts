import type { Dispatch, SetStateAction } from "react";

export interface CSVDataRow extends Record<string, string | number | boolean> {}

export interface TableProps {
  headers: string[];
  data: CSVDataRow[];
}

export interface ChartBProps {
  data: CSVDataRow[];
  yAxis: string;
  xAxis: string;
}

export interface ControlsProps {
  setXAxis: Dispatch<SetStateAction<string>>;
  csvHeaders: string[];
  setYAxis: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  xAxis: string;
  yAxis: string;
}
export interface SelectProps {
  onChange: Dispatch<SetStateAction<string>>;
  label: string;
  csvHeaders: string[];
  value: string;
}
