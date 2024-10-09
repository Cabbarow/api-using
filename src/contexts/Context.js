import React, { useContext } from "react";
import MyContext from "./MyContext";

const MyComponent = () => {
  const sharedValue = useContext(MyContext);

  return <p>{sharedValue}</p>;
};

export default MyComponent;
