import { useTheme } from "../store/Theme.context";
import { useNavigate } from "react-router-dom";
import { VStack, Input, Center, Text, Box } from "@chakra-ui/react";
import Button from "../components/Button.js"

const HomePage = () => {
  const { theme, switchTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <Box bg={theme === "Light" ? "#c8e6c9" : "green"} minHeight="100vh">
    <Center>
      <VStack>
        
        {/* <Text>Theme is: {theme}</Text> */}
        
        <Input />
        
        <Button
          title="Go to product 1"
          colorScheme="blue"
          onClick={() => {
            navigate("/product/1");
          }}
        />
      </VStack>
    </Center>
    </Box>
  );
};

export default HomePage;
