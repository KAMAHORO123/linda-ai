import {
  ChakraProvider,
  Box,
  VStack,
  Container,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import ChatInterface from "./components/ChatInterface";
import Header from "./components/Header";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

function App() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const { colorMode } = useColorMode();

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={bgColor}>
        <Header />
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              textAlign="center"
            >
              <MotionFlex
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                align="center"
                justify="center"
                gap={3}
                mb={4}
              >
                <Icon
                  as={FaRobot}
                  w={10}
                  h={10}
                  color={accentColor}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Heading as="h1" size="2xl" color={textColor}>
                  Ask Me Anything
                </Heading>
              </MotionFlex>
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
                  I'm Linda, your personal AI assistant. I can help you with
                  various tasks and answer your questions. Feel free to ask me
                  anything!
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.500"
                  mt={2}
                  display={{ base: "none", md: "block" }}
                >
                  {colorMode === "light"
                    ? "🌞 Light mode enabled"
                    : "🌙 Dark mode enabled"}
                </Text>
              </MotionBox>
            </MotionBox>
            <ChatInterface />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
