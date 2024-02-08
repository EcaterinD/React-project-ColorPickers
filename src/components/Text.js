import { useEffect } from "react";
import styles from "./Text.module.css";
import { useThemeColors } from '../store/ThemeColor.context';

const Text = (props) => {
  const { themeColors } = useThemeColors();

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
        color: themeColors.text,
        fontFamily: "'Permanent Marker', cursive"
      }}
      onClick={props.onClick}
    >
      {props.title}
    </div>
  );
};

export default Text;
