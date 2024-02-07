import { useEffect } from "react";
import { useTheme } from "../store/Theme.context";
import styles from "./Text.module.css";

const Text = (props) => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Button mounted!");

    return () => {
      console.log("Button unmounted!");
    };
  }, []);

  return (
    <div
      className={`${styles.container}`} 
      style={{
        color: theme === "Light" ? "green" : "#a5d6a7",
        fontFamily: "'Permanent Marker', cursive"
      }}
      onClick={props.onClick}
    >
      {props.title}
    </div>
  );
};

export default Text;
