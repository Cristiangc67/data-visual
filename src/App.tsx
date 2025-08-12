import { useState } from "react";
import type { ChangeEvent } from "react";
import type { CSVDataRow } from "./interfaces/interfaces";
import "./App.css";
import Table from "./components/Table";
import Error from "./components/Error";

function App() {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [csvData, setCsvData] = useState<CSVDataRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.type.endsWith(".csv")) {
      setError("Archivo CSV invalido");
      setFileName("");
      setCsvData([]);
      setCsvHeaders([]);
      return;
    }
    setError("");
    setFileName(file.name);
    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result as string;
      try {
        const { data, headers } = parseCsv(text);
        setCsvData(data);
        setCsvHeaders(headers);
      } catch (err) {
        setError("Error al procesar el archivo CSV");
        console.error("Error parsing CSV:", err);
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError("Error al leer el archivo");
      setIsLoading(false);
    };
  };

  const parseCsv = (text: string) => {
    const rows = text.split(/\r?\n/).filter((row) => row.trim() !== "");
    if (rows.length === 0) return { data: [], headers: [] };

    const headers = rows[0].split(",").map((value) => value.trim());
    const data: CSVDataRow[] = [];

    for (let i = 1; i < rows.length - 1; i++) {
      const values = rows[i].split(",").map((value) => value.trim());
      if (values.length === headers.length) {
        const rowObject: CSVDataRow = {};
        headers.forEach((header, index) => {
          rowObject[header] = values[index];
        });
        data.push(rowObject);
      }
    }
    return { data, headers };
  };

  return (
    <>
      <div className="min-h-screen font-sans bg-neutral-900 flex flex-col items-center p-4">
        <div className="bg-black p-8 rounded-xl shadow-2xl w-full max-w-7xl text-center">
          <h1 className="font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-3xl">
            Lector y Visualizador de Archivos CSV
          </h1>
          <label
            className="relative group block w-full border-2 border-dashed border-purple-800 rounded-lg p-6 text-purple-800  hover:text-purple-500 hover:border-purple-500 transition duration-300 cursor-pointer mb-6"
            htmlFor="file-upload"
          >
            <div className="flex flex-col items-center justify-center">
              <svg
                className=""
                width="2.5rem"
                height="2.5rem"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="text-lg font-semibold">
                Haz clic para seleccionar o arrastra un archivo CSV aquí
              </p>
            </div>
            <input
              id="file-upload"
              onChange={handleFileChange}
              type="file"
              accept=".csv"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          {error !== "" && <Error errorText={error} />}
          <span className=" font-semibold ">{fileName}</span>

          {isLoading ? (
            <>
              <div className="w-2 h-10 mt-10 bg-gradient-to-r from-purple-500 to-pink-500 animate-spin m-auto "></div>
            </>
          ) : (
            csvData.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-start mb-4">
                  Datos leidos: {csvData.length} registro
                  {csvData.length > 1 && "s"}
                </h2>
                <Table headers={csvHeaders} data={csvData} />
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
