import { useReducer, useRef } from 'react';
import styles from "./ColorPicker.module.css";
import Button from "../components/Button.js";
import Text from "../components/Text.js";
import { Box, Text as ChakraText, Button as ChakraButton } from "@chakra-ui/react";
import { useTheme } from "../store/Theme.context";
import '../App.css';

const setColor = (color) => ({
    type: 'SET_COLOR',
    payload: color,
  });
  
const setImage = (image) => ({
    type: 'SET_IMAGE',
    payload: image,
  });

const initialState = {
    color: '#5524e7',
    image: null,
  };
  
const colorPickerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_COLOR':
        return { ...state, color: action.payload };
      case 'SET_IMAGE':
        return { ...state, image: action.payload };
      default:
        return state;
    }
  };
  
  const ColorPicker = () => {
    const [state, dispatch] = useReducer(colorPickerReducer, initialState);
    const color = state.color;
    const image = state.image;
    const { theme, switchTheme } = useTheme();
    const fileInputRef = useRef();
    
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const openEyeDropper = async () => {
      let eyeDropper = new window.EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      dispatch(setColor(sRGBHex));
    };
  
    const handleFileInput = (e) => {
      dispatch(setImage(URL.createObjectURL(e.target.files[0])));
    };
  
    const handleCopyColor = async () => {
    await navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);

  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.leftColumn} 
      style={{ backgroundColor: theme === 'Light'  ? "#c8e6c9" : "green" }}>

        <Box p="10">
          <Text title={`Select an image :`}/>
          <input
            ref={fileInputRef}
            onChange={handleFileInput}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            />
            <Button onClick={handleButtonClick} title={`Choose File`}/>
        </Box>

        <Box p="10">
            <Text title={`Pick the color :`}/>
            <Button 
            title={`Open Eyedropper`}
            onClick={openEyeDropper}
            />
        </Box>

        <Box p="10">
          <Text title={`Selected color :`}/>
          <ChakraText
            className={styles.selectedColor}
            style={{ background: color, fontFamily: "Permanent Marker, cursive"}}
            onClick={handleCopyColor}
          >{color}</ChakraText>
        </Box>

        <Box p="10">
        <Button 
          title={`Copy to clipboard`}
          onClick={handleCopyColor}
        />
        </Box>

      </Box>

      <Box className={styles.rightColumn}>
        {image ? (
          <>
            <img src={image} alt="Working image" />
            <div
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          </>
        ) : (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="4em"
            width="4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path>
            <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"></path>
          </svg>
        )}
      </Box>
    </Box>
  );
};

export default ColorPicker;


// import { useState } from "react";
// import styles from "./ColorPicker.module.css";

// const ColorPicker = () => {
//   const [color, setColor] = useState("#5524e7");
//   const [image, setImage] = useState(null);

//   const openEyeDropper = async () => {
//     let eyeDropper = new window.EyeDropper();
//     const { sRGBHex } = await eyeDropper.open();
//     setColor(sRGBHex);
//   };

//   const handleFileInput = (e) => {
//     setImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleCopyColor = async () => {
//     await navigator.clipboard.writeText(color);
//     alert(`Copied ${color} to clipboard!`);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.leftColumn}>
//         <h1 className={styles.headingText}>Pick color from image</h1>

//         <div className={styles.formSection}>
//           <p>1. Select an image</p>
//           <input onChange={handleFileInput} type="file" accept="image/*" />
//         </div>

//         <div className={styles.formSection}>
//           <p>2. Pick color</p>
//           <button className={styles.openPickerButton} onClick={openEyeDropper}>
//             Open Eyedropper
//           </button>
//         </div>

//         <div className={styles.formSection}>
//           <p>3. View selected</p>
//           <button
//             className={styles.selectedColor}
//             style={{ background: color }}
//             onClick={handleCopyColor}
//           >
//             <span>{color}</span>
//           </button>
//         </div>

//         <span className={styles.shoutout}>
//           Made with ❤️ by{" "}
//           <a href="https://linktr.ee/tomisloading" target="_blank">
//             @tomisloading
//           </a>
//         </span>
//       </div>

//       <div className={styles.rightColumn}>
//         {image ? (
//           <>
//             <img src={image} alt="Working image" />
//             <div
//               style={{
//                 backgroundImage: `url(${image})`,
//               }}
//             />
//           </>
//         ) : (
//           <svg
//             stroke="currentColor"
//             fill="currentColor"
//             strokeWidth="0"
//             viewBox="0 0 16 16"
//             height="4em"
//             width="4em"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path>
//             <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"></path>
//           </svg>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ColorPicker;