import React, { useEffect } from "react";
import { FeedUnit } from "./FeedUnit";

const FeedSection = (props) => {
  const [units, setUnits] = React.useState([]);
  console.log("Feed Section Rendered");

  useEffect(() => {
    props.posts.map((post) => {
      setUnits((units) => [
        ...units,
        <FeedUnit post={post} key={units.length} />,
      ]);
    });
  }, [props.posts]);

  return <div className=" mb-[3rem] flex flex-col">{units}</div>;
};

export { FeedSection };
