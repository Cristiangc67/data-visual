import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import type { CSVDataRow } from "./interfaces/interfaces";
import "./App.css";
import Table from "./components/Table";
import Error from "./components/Error";
import Loader from "./components/Loader";
import ChartB from "./components/ChartB";
import Controls from "./components/Controls";
import { parseCsv } from "./utils/utils";
import Upload from "./components/Upload";

function App() {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [csvData, setCsvData] = useState<CSVDataRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartData, setChartData] = useState<CSVDataRow[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (csvHeaders.length > 0) {
      setXAxis(csvHeaders[0]);
      setYAxis(csvHeaders[1] || csvHeaders[0]);
    }
  }, [csvHeaders]);

  useEffect(() => {
    if (filteredRows.length > 0 && xAxis && yAxis) {
      const validData = filteredRows.filter((row) => {
        const value = row[yAxis];
        if (typeof value === "boolean") return true;
        if (typeof value === "string")
          return value !== "NA" && !isNaN(Number(value));
        return typeof value === "number" && !isNaN(value);
      });
      const groupedData = validData.reduce((accumulator, row) => {
        const category =
          typeof row[xAxis] === "boolean"
            ? row[xAxis].toString()
            : String(row[xAxis]);

        let numericValue: number;
        if (typeof row[yAxis] === "boolean") {
          numericValue = row[yAxis] ? 1 : 0;
        } else {
          numericValue = Number(row[yAxis]) || 0;
        }

        if (!accumulator[category]) {
          accumulator[category] = {
            category,
            total: 0,
            count: 0,
            [yAxis]: 0,
          };
        }

        accumulator[category].total += numericValue;
        accumulator[category].count++;
        accumulator[category][yAxis] =
          accumulator[category].total / accumulator[category].count;

        return accumulator;
      }, {} as Record<string, { category: string; total: number; count: number; [key: string]: any }>);

      const chartReadyData = Object.values(groupedData).map((group) => ({
        [xAxis]: group.category,
        [yAxis]: group[yAxis],
      }));

      setChartData(chartReadyData);
    } else {
      setChartData([]);
    }
  }, [csvData, xAxis, yAxis]);

  const filteredRows = useMemo(() => {
    if (!search) return csvData;

    const q = search.toLowerCase();
    return csvData.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [csvData, search]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.type.endsWith(".csv")) {
      setError("Archivo CSV invalido");
      setFileName("");
      setCsvData([]);
      setCsvHeaders([]);
      setXAxis("");
      setYAxis("");
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

  return (
    <>
      <div className="min-h-screen font-sans bg-neutral-900 flex flex-col items-center md:p-4">
        <div className="bg-black p-2 md:p-8 rounded-xl shadow-2xl w-full max-w-7xl text-center">
          <h1 className="font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-3xl">
            Lector y Visualizador de Archivos CSV
          </h1>

          <Upload handleFileChange={handleFileChange} />
          {error !== "" && <Error errorText={error} />}
          <span className=" font-semibold ">{fileName}</span>

          {isLoading ? (
            <Loader />
          ) : (
            csvData.length > 0 && (
              <>
                <Controls
                  csvHeaders={csvHeaders}
                  setXAxis={setXAxis}
                  setYAxis={setYAxis}
                  setSearch={setSearch}
                  xAxis={xAxis}
                  yAxis={yAxis}
                />
                <div className="w-full h-80 bg-neutral-900  rounded-lg p-2">
                  <ChartB data={chartData} yAxis={yAxis} xAxis={xAxis} />
                </div>
                <h2 className="text-xl font-bold text-start mb-4">
                  Datos leidos: {filteredRows.length} registro
                  {csvData.length > 1 && "s"}
                </h2>
                <Table headers={csvHeaders} data={filteredRows} />
              </>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
