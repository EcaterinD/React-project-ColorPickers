import { useEffect } from "react";
import styles from "./Button.module.css";
import { useThemeColors } from '../store/ThemeColor.context';

const Button = (props) => {
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
        backgroundColor: themeColors.backgroundButton,
        color: themeColors.textButton,
        fontFamily: "'Permanent Marker', cursive"
      }}
      onClick={props.onClick}
    >
      {props.title}
    </div>
  );
};

export default Button;
