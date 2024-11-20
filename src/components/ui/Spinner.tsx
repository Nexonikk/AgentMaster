import React from "react";

const Spinner = () => {
  return (
    <div className="p-1 animate-spin bg-gradient-to-bl from-purple-400 via-purple-600 to-purple-500 md:w-7 md:h-7 h-12 w-12 aspect-square rounded-full">
      <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
    </div>
  );
};

export default Spinner;
