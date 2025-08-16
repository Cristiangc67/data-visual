import type { ControlsProps } from "../interfaces/interfaces";
import Select from "./Select";

const Controls = ({
  setXAxis,
  setYAxis,
  setSearch,
  xAxis,
  yAxis,
  csvHeaders,
}: ControlsProps) => {
  return (
    <div className=" my-5 md:items-end gap-10 bg-neutral-900/70 px-2 py-5 rounded-lg">
      <h2 className="text-3xl text-start font-semibold ">Controles</h2>
      <div className="flex flex-col md:flex-row justify-between mt-5 gap-5">
        <div className="flex flex-col w-full flex-3/12 text-start">
          <label className="mb-2 font-semibold" htmlFor="query">
            Busqueda
          </label>
          <input
            id="query"
            name="query"
            className="h-10  px-2 rounded-lg bg-purple-800/50 border border-purple-500 "
            type="text"
            placeholder="Filtrar por palabra..."
            onChange={(e) => setTimeout(() => setSearch(e.target.value), 1000)}
          />
        </div>

        <Select
          label="Eje X"
          onChange={setXAxis}
          csvHeaders={csvHeaders}
          value={xAxis}
        />
        <Select
          label="Eje Y (valor numerico)"
          onChange={setYAxis}
          csvHeaders={csvHeaders}
          value={yAxis}
        />
      </div>
    </div>
  );
};

export default Controls;
