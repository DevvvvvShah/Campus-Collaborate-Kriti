import React from "react";

function ViewsLikes(prop) {
  return (
    <div className="w-[100%] flex justify-between">
      <div>
        <span className="font-semibold">{prop.Value}</span>
      </div>
      <div className="mr-[1rem]">
        <span className=" font-semibold">{prop.Number}</span>
      </div>
    </div>
  );
}

export default ViewsLikes;
