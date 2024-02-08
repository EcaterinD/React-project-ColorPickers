import { useNavigate } from "react-router-dom";
import { VStack, Input, Center, Box, Flex } from "@chakra-ui/react";
import { useThemeColors } from '../store/ThemeColor.context';
import { Heading } from "@chakra-ui/react";

const CustomHeading = ({ children, fontSize, mt}) => {
  const { themeColors } = useThemeColors();

  return (
    <Heading
      display="flex"
      alignItems="center"
      fontSize={fontSize}
      fontFamily="'Permanent Marker', cursive"
      color={themeColors.text}
      mt={mt}
      textAlign="center"
      paddingX={4}
    >
      {children}
    </Heading>
  );
};

const HomePage = () => {
  const { themeColors, handleBaseColorChange } = useThemeColors();
  const navigate = useNavigate();

  return (
    <Box bg={themeColors.background} minHeight="100vh">
      <Center>
      <VStack maxWidth={"700px"}>
          <CustomHeading fontSize="40px" mt="70px">Welcome to </CustomHeading>
          <CustomHeading fontSize="40px">"Heavenly Coloring Palette"</CustomHeading>
          <CustomHeading fontSize="25px" mt="70px">
            Unlock your creativity and personalize your browsing experience like never before with our innovative colorPicker tools.
          </CustomHeading>
          <CustomHeading fontSize="25px" mt="30px">
            Customize the site's theme effortlessly by selecting it from the picker below :
          </CustomHeading>
          <Input  maxWidth="300px" mt="40px" type="color" border="none" value={themeColors.text} onChange={handleBaseColorChange} />
          <CustomHeading fontSize="25px" mt="40px">
            what do you prefer?
          </CustomHeading>
          <Flex direction="row" justify="center" align="center">
            <CustomHeading fontSize="35px" mt="5px">
            vibrant and bold &nbsp; hues
            </CustomHeading>
            <CustomHeading fontSize="25px" mt="5px">
              or
            </CustomHeading>
            <CustomHeading fontSize="35px" mt="5px">
              subtle and soft pastels
            </CustomHeading>
          </Flex>
          <CustomHeading fontSize="25px" mt="5px">
            the choice is
          </CustomHeading>
          <CustomHeading fontSize="35px" mt="5px">
            yours
          </CustomHeading>
        </VStack>
      </Center>
    </Box>
  );
};

export default HomePage;
