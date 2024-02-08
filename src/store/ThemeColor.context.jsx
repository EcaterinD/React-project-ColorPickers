import React, { createContext, useState, useContext, useEffect } from 'react';
import chroma from 'chroma-js';
import { needsLighterContrastColor } from '../components/ColorEditingFunctions';
import { useTheme } from "../store/Theme.context";

const generateTheme = (baseColor, theme) => {

    let backgroundButton; 
    let textButton;
    let backgroundNavbar;
    let text;
    let background;

    // culoare inchisa
    if (needsLighterContrastColor(baseColor))
        if(theme === "Light" )  {
            backgroundButton = baseColor; 
            textButton = chroma(baseColor).brighten(2.5).hex();
            backgroundNavbar = chroma(baseColor).brighten(2.5).hex();
            text = baseColor;
            background =  chroma(baseColor).brighten(3).hex();
        }
        else {
            backgroundButton = chroma(baseColor).saturate(1).brighten(2.5).hex(); 
            textButton = baseColor;
            backgroundNavbar = chroma(baseColor).saturate(1).darken(1).hex();
            text = chroma(baseColor).saturate(1).brighten(2.5).hex();
            background = baseColor;
        }

    //culoare deschisa
    if (!needsLighterContrastColor(baseColor))
        if(theme === "Light" ) {
            backgroundButton = chroma(baseColor).saturate(2).darken(2.5).hex(); 
            textButton = baseColor;
            backgroundNavbar = textButton;
            text = chroma(baseColor).saturate(2).darken(2.5).hex();
            background = chroma(baseColor).saturate(1).brighten(0.5).hex();
        }
        else {
            backgroundButton = baseColor; 
            textButton = chroma(baseColor).saturate(2).darken(2.5).hex();
            backgroundNavbar = chroma(baseColor).saturate(2).darken(2.5).hex();
            text = baseColor;
            background = chroma(baseColor).saturate(2).darken(2).hex();}

    return {
      backgroundButton,
      textButton,
      backgroundNavbar,
      text,
      background,
    };
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

export const ThemeColor = createContext();

export const ThemeColorProvider = ({ children }) => {
    const { theme } = useTheme();
    const [baseColor, setBaseColor] = useState(getRandomColor());
    const [themeColors, setThemeColors] = useState(generateTheme(baseColor, theme));

    useEffect(() => {
      setThemeColors(generateTheme(baseColor, theme));
    }, [baseColor, theme]);
  
    const handleBaseColorChange = (event) => {
        setBaseColor(event.target.value);
      };
  
    return (
      <ThemeColor.Provider value={{ themeColors, handleBaseColorChange }}>
        {children}
      </ThemeColor.Provider>
    );
  };

export const useThemeColors = () => useContext(ThemeColor);