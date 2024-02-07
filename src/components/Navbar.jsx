import { Link, Outlet, useMatch } from "react-router-dom";
import { Box, HStack, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import Button from "../components/Button.js";
import { useTheme } from "../store/Theme.context";
import '../App.css';

const Navbar = () => {
  const homeMatch = useMatch("/");
  const counterMatch = useMatch("/counter");
  const { theme, switchTheme } = useTheme();

  return (
    <>
      <HStack bg={theme === "Light" ? "#a5d6a7" : "green" } 
              p="3" spacing="10" align="center">

      <Button 
          title={`${theme === "Light" ? "Dark" : "Light" } theme`}
          onClick={() => switchTheme()}
        />

        <Box p="3" fontFamily="'Permanent Marker', cursive">
          <Link to="/">
            <Text px="2"
              color={theme === "Light" ? "green" : "#a5d6a7"}
              border={homeMatch ? theme === "Light" ? "2px solid green" : "2px solid #a5d6a7" : "none"}
              borderRadius={homeMatch ? "10px" : "none"}
              fontWeight="bold"
              fontSize="24"
            >
              Home
            </Text>
          </Link>
        </Box>

        <Box fontFamily="'Permanent Marker', cursive" color={theme === "Light" ? "green" : "#a5d6a7"}
              border={homeMatch ? "none":  theme === "Light" ? "2px solid green" : "2px solid #a5d6a7" }
              borderRadius={homeMatch ? "none" : "10px" }>
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

        <CloseIcon
          color={theme === "Light" ? "green" : "#a5d6a7"}
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
