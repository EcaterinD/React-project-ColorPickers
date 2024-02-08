import { useReducer, useRef } from 'react';
import styles from "./ColorPicker.module.css";
import Button from "../components/Button.js";
import Text from "../components/Text.js";
import { Box, Text as ChakraText, useToast } from "@chakra-ui/react";
import { useTheme } from "../store/Theme.context";
import '../App.css';
import { getContrastTextColor, needsLighterContrastColor } from "./ColorEditingFunctions.jsx";
import { auth, db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useThemeColors } from '../store/ThemeColor.context.jsx';

const setColor = (color) => ({
    type: 'SET_COLOR',
    payload: color,
  });
  
const setImage = (image) => ({
    type: 'SET_IMAGE',
    payload: image,
  });

  
  const ColorPicker = () => {
    const { theme } = useTheme();
    const { themeColors } = useThemeColors();
    const initialState = {
      color: themeColors.text,
      image: null,
    };
    const toast = useToast();
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

    const [state, dispatch] = useReducer(colorPickerReducer, initialState);
    const { color, image } = state;
    const fileInputRef = useRef();
    const contrastColor = getContrastTextColor(color);
    
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
  
    const handleCopyColorClipboard = async () => {
      await navigator.clipboard.writeText(color);
      toast({
        title: "Copied to clipboard",
        description: `Color ${color} copied to clipboard`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };

    const handleCopyColor = async () => {
      const userId = auth.currentUser.uid;
      const userColorRef = collection(db, 'users', userId, 'colors');

      await addDoc(userColorRef, { color });

      toast({
        title: "Color saved",
        description: `Color ${color} saved to your colors list!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.leftColumn} 
      style={{ backgroundColor: themeColors.background }}>

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
          <Text title={needsLighterContrastColor(color)
        ? (theme === 'Light'    
          ? 'Selected color on : Background' 
          : 'Selected color on : HexCode')
        : (theme === 'Light' 
          ? 'Selected color on : HexCode' 
          : 'Selected color on : Background')}/>
          <ChakraText
            className={styles.selectedColor}
            style={{ 
                marginTop: '10px', 
                backgroundColor: needsLighterContrastColor(color) 
                  ? (theme === 'Light' ? color : contrastColor)
                  : (theme === 'Light' ? contrastColor : color),  
                color: needsLighterContrastColor(color) 
                  ? (theme === 'Light' ? contrastColor : color)
                  : (theme === 'Light' ? color : contrastColor),
                fontFamily: "Permanent Marker, cursive",
                fontSize: "25px"
              }}
          >{color}</ChakraText>
        </Box>

        <Text title={`Copy to :`}/>

        <Box px="10">
        <Button 
          title={`Clipboard`}
          onClick={handleCopyColorClipboard}
        />
        </Box>

        <Box px="10">
        <Button 
          title={`My colors`}
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