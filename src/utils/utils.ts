import type { CSVDataRow } from "../interfaces/interfaces";
export const parseCsv = (text: string) => {
  const rows = text.split(/\r?\n/).filter((row) => row.trim() !== "");
  if (rows.length === 0) return { data: [], headers: [] };

  const headers = rows[0].split(",").map((value) => value.trim());
  const data: CSVDataRow[] = [];

  for (let i = 1; i < rows.length - 1; i++) {
    const values = rows[i].split(",").map((value) => parseValue(value));
    if (values.length === headers.length) {
      const rowObject: CSVDataRow = {};
      headers.forEach((header, index) => {
        rowObject[header] = values[index];
      });
      data.push(rowObject);
    }
  }
  console.log(data);
  return { data, headers };
};

export const parseValue = (value: string): string | number | boolean => {
  const trimmedValue = value.trim();

  if (!isNaN(Number(trimmedValue))) {
    return Number(trimmedValue);
  }

  if (trimmedValue.toLowerCase() === "true") return true;
  if (trimmedValue.toLowerCase() === "false") return false;

  return trimmedValue;
};
