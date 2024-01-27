import React from "react";

function SkillsTiles(prop) {
  return (
    <div className="flex justify-center items-center ml-[0.5rem] bg-[#46D97E] rounded-xl">
      <span className="p-[0.3rem] text-xs">{prop.value}</span>
    </div>
  );
}

export default SkillsTiles;
