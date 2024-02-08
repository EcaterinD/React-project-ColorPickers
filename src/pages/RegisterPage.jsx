import {
  Center, FormControl,
  Heading, Input,
  Box, Image, Flex
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth"
import emailIcon from "../components/assets/email.png";
import passwordIcon from "../components/assets/password.png";
import '../App.css';
import { useThemeColors } from '../store/ThemeColor.context';
import Text from "../components/Text.js"
import Button from "../components/Button.js";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { themeColors } = useThemeColors();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <Center flexDirection="column" height="100vh"
    bgGradient={`linear(${themeColors.text}, ${themeColors.background})`}>
        <Heading display="flex" alignItems="center" fontSize="50px"
          fontFamily="'Permanent Marker', cursive" mb="70px" color={`${themeColors.background}`}
        >~ Heavenly Coloring Palette ~</Heading>
        <Center
          flexDirection="column"
          p="43"
          bg="#ffffff"
          borderRadius="lg">

        <Heading display="flex" alignItems="center"
          fontFamily="'Permanent Marker', cursive" mb="20px" color={`${themeColors.text}`}
        >Register</Heading>

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

        <Button mt="9" onClick={onRegister} bg="green.600" color="white" fontFamily="'Permanent Marker', cursive" fontWeight="normal" title="Register"/>

        <Flex direction="row" mt="5" color="green.400" fontFamily="'Permanent Marker', cursive">
          <Text mr="2" mt="2" title="You already have an account?"/>
            
          <Button
            color="green.600"
            bg="none"
            onClick={() => {
              navigate("/login");
            }}
            title="Login"/>
        </Flex>

      </Center>
    </Center>
  );
};

export default RegisterPage;
