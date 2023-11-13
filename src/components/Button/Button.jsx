import React from "react";
import styles from "./button.module.css";

export default function Button(props) {
  const [colorState, setColorState] = React.useState("black");

  let styleButton = {
    padding: props.padding,
    backgroundColor: colorState,
  };

  return (
    <button onClick={props.onClick} style={styleButton} className={styles.btn}>
      {props.children}
    </button>
  );
}
