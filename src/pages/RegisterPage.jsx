import {
  Button, Center, FormControl,
  Heading, Input,
  Text, Box, Image, Flex
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
import styled from '@emotion/styled';
import '../App.css';

const RegisterPage = () => {
  const navigate = useNavigate();

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

//   const StyledInput = styled(Input)`
//   ::placeholder {
//     font-family: 'Permanent Marker', cursive;
//   }
// `;

const StyledButtonDark = styled(Button)`
background-color: rgba(46, 125, 50, 1);

:hover {
  background-color: rgba(27, 94, 32, 1);
}
`;

const StyledButtonLight = styled(Button)`
background-color: white;

:hover {
  background-color: rgba(200, 230, 201, 1);
}
`;

  return (
    <Center flexDirection="column" height="100vh"
      bgGradient="linear(#288036, #e3ffe7)">
        <Center
          flexDirection="column"
          p="43"
          bg="#ffffff"
          borderRadius="lg">

        <Heading display="flex" alignItems="center"
          fontFamily="'Permanent Marker', cursive" mb="20px" color="green.600"
        >Register</Heading>

        <FormControl>
        <Box display="flex" alignItems="center" bg="green.100" mt="4">
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
          <Box display="flex" alignItems="center" bg="green.100" mt="4">
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

        <StyledButtonDark mt="9" onClick={onRegister} bg="green.600" color="white" fontFamily="'Permanent Marker', cursive" fontWeight="normal">
          Register
        </StyledButtonDark>

        <Flex direction="row" mt="5" color="green.400" fontFamily="'Permanent Marker', cursive">
          <Text mr="2" mt="2">
            You already have an account?
          </Text>
          <StyledButtonLight
            color="green.600"
            bg="none"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </StyledButtonLight>
        </Flex>

      </Center>
    </Center>
  );
};

export default RegisterPage;
