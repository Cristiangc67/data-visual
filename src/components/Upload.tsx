import type { ChangeEvent } from "react";

const Upload = ({
  handleFileChange,
}: {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
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
          />
          <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="currentColor" />
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
  );
};

export default Upload;
