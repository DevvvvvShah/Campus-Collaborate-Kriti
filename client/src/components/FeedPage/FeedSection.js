import React, { useEffect } from "react";
import { FeedUnit } from "./FeedUnit";

const FeedSection = (props) => {
  const [units, setUnits] = React.useState([]);
  console.log("Feed Section Rendered");

  useEffect(() => {
    setUnits([]);
    props.posts.map((post) => {
      setUnits((units) => [
        ...units,
        <FeedUnit post={post} key={units.length} />,
      ]);
    });
  }, [props.posts]);

  return (
    <div className="ml-0 flex flex-col w-[90vw] md:w-[40vw] md:ml-[25rem] md:mr-[2rem] mt-[0]">
      {units}
    </div>
  );
};

export { FeedSection };
