import {
  Center, FormControl,
  Heading, Input,
  Box, Image, Flex
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../store/auth.reducer";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import emailIcon from "../components/assets/email.png";
import passwordIcon from "../components/assets/password.png";
import '../App.css';
import { useThemeColors } from '../store/ThemeColor.context';
import Button from "../components/Button.js"
import Text from "../components/Text.js"

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeColors } = useThemeColors();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };


  return (
    <Center flexDirection="column" height="100vh"
    bgGradient={`linear(${themeColors.background}, ${themeColors.text})`}>
      <Heading display="flex" alignItems="center" fontSize="50px"
          fontFamily="'Permanent Marker', cursive" mb="70px" color={`${themeColors.text}`}
        >~ Heavenly Coloring Palette ~</Heading>
      <Center
        flexDirection="column"
        p="43"
        bg="#ffffff"
        borderRadius="lg">

        <Heading display="flex" alignItems="center"
          fontFamily="'Permanent Marker', cursive" mb="20px" color={`${themeColors.text}`}
        >Login</Heading>

        <FormControl>
        <Box display="flex" alignItems="center" bg={`${themeColors.backgroundNavbar}`} mt="4">
          <Image src={emailIcon} boxSize="40px" p="2" />
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            type="email"
            placeholder="Email"
          />
          </Box>
        </FormControl>

        <FormControl>
          <Box display="flex" alignItems="center" bg={`${themeColors.backgroundNavbar}`} mt="4">
          <Image src={passwordIcon} boxSize="40px" p="2"/>
          <Input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            type="password"
            placeholder="Password"
          />
          </Box>
        </FormControl>

        {error && <Text color="red">{error}</Text>}

        <Button title={"Log in"} mt="9" onClick={onLogin} color="white" 
          fontFamily="'Permanent Marker', cursive" fontWeight="normal"/>

        <Flex direction="row" mt="5" fontFamily="'Permanent Marker', cursive">
          <Text title={"You don't have an account?"} mr="2" mt="2"/>

          <Button
            title={"Register"}
            bg="none"
            onClick={() => {
              navigate("/register");
            }}
          />
        </Flex>
      </Center>
    </Center>
  );
};

export default LoginPage;
