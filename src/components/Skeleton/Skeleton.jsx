import React from "react";

function Skeleton() {
  return (
    <div className="my-[3%] sm:my-[10%]">
      <div className="h-[2rem] w-[100%] bg-gray-300 rounded-full flex justify-center items-center gap-2">
        <div className="h-[100%] w-[8.5%] rounded-full bg-gray-400"></div>
        <div className="w-[30%] h-[90%] bg-gray-400 rounded"></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default Skeleton;
