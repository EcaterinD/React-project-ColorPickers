import { useTheme } from "../store/Theme.context";

const Input = () => {
  const { theme } = useTheme();

  return (
    <input
      type="text"
      style={{
        backgroundColor: theme === "Light" ? "green" : "white",
        color: theme === "Light" ? "white" : "green",
      }}
    />
  );
};

export default Input;
