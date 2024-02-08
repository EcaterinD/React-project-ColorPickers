import React, { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import { Box, Heading, List, ListItem, SimpleGrid, useToast} from "@chakra-ui/react";
import { useThemeColors } from '../store/ThemeColor.context.jsx';
import { getContrastTextColor } from "./ColorEditingFunctions.jsx";
import styles from "./MyColors.modules.css";
import { needsLighterContrastColor } from './ColorEditingFunctions.jsx';
import { useTheme } from '../store/Theme.context';
import Text from "./Text.js";
import chroma from 'chroma-js';

const MyColors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { themeColors } = useThemeColors();
  const { theme } = useTheme();
  const toast = useToast();

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const userColorRef = collection(doc(db, 'users', userId), 'colors');
    
    const unsubscribe = onSnapshot(userColorRef, (snapshot) => {
      const colorsArray = snapshot.docs.map(doc => doc.data().color);
      setColors(colorsArray);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      
    <Box bg={themeColors.background} minHeight="100vh" 
      display="flex" justifyContent="center" alignItems="center" width="100%" margin="auto">
      <Heading
        fontSize="40px"
        fontFamily="'Permanent Marker', cursive"
        color={themeColors.text}
        textAlign="center"
        paddingX={40}>
        Loading...
      </Heading>
    </Box>
  ); 
  }

  return (
    <Box bg={themeColors.background} minHeight="100vh" 
    display="flex" justifyContent="center" width="100%">
      {colors.length === 0 ? (
        <Text title="No color saved"/>
      ) : (
        <Box>
          <Heading fontSize="37px" mt="30px"
            fontFamily="'Permanent Marker', cursive"
            color={themeColors.text}
            textAlign="center"
            paddingX={40}> 
          ~ Your colors and many more ~</Heading>
          <Heading fontSize="20px"
            fontFamily="'Permanent Marker', cursive"
            color={themeColors.text}
            textAlign="center"
            paddingX={40}> 
          and you can copy to clipboard each one by clicking on it</Heading>

          <List spacing={6}>
            {colors.map((color, index) => (
              <ListItem key={index} p={3} className={styles.selectedColor}
                style={{ 
                  marginTop: '10px', 
                  fontFamily: "Permanent Marker, cursive",
                  fontSize: "25px"
                }}>
                  <Box bg={getContrastTextColor(color)} display="flex" justifyContent="center" alignItems="center" mb="10px"
                    style={{ 
                      backgroundColor: needsLighterContrastColor(color) 
                        ? (theme === 'Light' ? color : getContrastTextColor(color))
                        : (theme === 'Light' ? getContrastTextColor(color) : color),  
                      color: needsLighterContrastColor(color) 
                        ? (theme === 'Light' ? getContrastTextColor(color) : color)
                        : (theme === 'Light' ? color : getContrastTextColor(color)),
                        width: '200px',
                        height: '100px',
                        border: 'none',
                        borderRadius: '0.4rem',
                      }}
                   onClick={() => {
                        navigator.clipboard.writeText(color);
                        toast({
                          title: "Copied to clipboard",
                          description: `Color ${color} copied to clipboard`,
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                        });
                      }}
                    >
                      {color}
                  </Box>
                  <SimpleGrid columns={6} spacing={3} width="95vh" mb="10px">
                    {chroma.scale(['white', color, 'black']).colors(10).slice(2, -2).map((nuance, i) => (
                      <Box key={i} bg={nuance} height="50px" 
                      border= 'none' borderRadius= '0.6rem' onClick={() => {
                        navigator.clipboard.writeText(nuance).then(() => {
                          toast({
                            title: "Copied to clipboard",
                            description: `Color ${nuance} copied to clipboard`,
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                          });
                        });
                      }}/>
                    ))}
                  </SimpleGrid>
                  <SimpleGrid columns={6} spacing={3} width="95vh">
                    {chroma.scale(['white', getContrastTextColor(color), 'black']).colors(10).slice(2, -2).map((nuance, i) => (
                      <Box key={i} bg={nuance} height="50px"
                      border= 'none' borderRadius= '0.6rem' onClick={() => {
                        navigator.clipboard.writeText(nuance).then(() => {
                          toast({
                            title: "Copied to clipboard",
                            description: `Color ${nuance} copied to clipboard`,
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                          });
                        });
                      }}/>
                    ))}
                  </SimpleGrid>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default MyColors;