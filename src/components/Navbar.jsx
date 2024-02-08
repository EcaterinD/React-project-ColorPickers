import { Link, Outlet, useMatch } from "react-router-dom";
import { Box, HStack, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import Button from "../components/Button.js";
import { useTheme } from "../store/Theme.context";
import { useThemeColors } from '../store/ThemeColor.context';
import '../App.css';

const Navbar = () => {
  const homeMatch = useMatch("/");
  const colorPickerMatch = useMatch("/colorpicker");
  const { theme, switchTheme } = useTheme();
  const userId = auth.currentUser.uid;
  const myColorsMatch = useMatch(`/users/${userId}/colors`);
  const { themeColors } = useThemeColors();

  return (
    <>
      <HStack bg={themeColors.backgroundNavbar} 
              p="3" spacing="10" align="center">

      <Button 
          title={`${theme === "Light" ? "Dark" : "Light" } theme`}
          onClick={() => switchTheme()}
        />

        <Box p="3" fontFamily="'Permanent Marker', cursive">
          <Link to="/">
            <Text px="2"
              color={themeColors.text}
              border={homeMatch ? `2px solid ${themeColors.text}` : "none"}
              borderRadius={homeMatch ? "10px" : "none"}
              fontWeight="bold"
              fontSize="24"
            >
              Home
            </Text>
          </Link>
        </Box>

        <Box fontFamily="'Permanent Marker', cursive" color={themeColors.text}
              border={colorPickerMatch ?`2px solid ${themeColors.text}` : "none"}
              borderRadius={colorPickerMatch ? "10px" : "none"}>
          <Link to="/colorpicker">
            <Text px="2"
              fontWeight="bold"
              fontSize="20"
            >
              Color-Picker
            </Text>
            <Text fontSize="14" align="center">
              From image
            </Text>
          </Link>
        </Box>

        <Box fontFamily="'Permanent Marker', cursive" color={themeColors.text}
              border={myColorsMatch ? `2px solid ${themeColors.text}` : "none"}
              borderRadius={myColorsMatch ? "10px" : "none"}>
          <Link to={`/users/${userId}/colors`}>
            <Text px="2"
              fontWeight="bold"
              fontSize="20"
            >
              My colors
            </Text>
          </Link>
        </Box>

        <CloseIcon
          color={themeColors.text}
          ml="auto"
          mr="5"
          w={6}
          h={6}
          _hover={{
            cursor: "pointer",
          }}
          onClick={() => {
            signOut(auth);
          }}
        />
      </HStack>

      <Outlet />
    </>
  );
};

export default Navbar;
