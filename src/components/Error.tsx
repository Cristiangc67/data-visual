import React from "react";

const Error = ({ errorText }: { errorText: string }) => {
  return (
    <div className=" bg-red-700/40 w-fit mx-auto px-5 rounded-2xl py-4 border border-red-400/50">
      <p>{errorText}</p>
    </div>
  );
};

export default Error;
