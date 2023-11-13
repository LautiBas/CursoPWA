import React from "react";
import "./loader.css";
import { DotWave } from "@uiball/loaders";

function Loader(props) {
  let styleContainer = {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  };

  return (
    <div style={styleContainer}>
      <DotWave size={80} speed={1.4} color="#fff" {...props} />
    </div>
  );
}

export default Loader;
