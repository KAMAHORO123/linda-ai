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
} from "@chakra-ui/react";
import ChatInterface from "./components/ChatInterface";
import Header from "./components/Header";
import { FaRobot } from "react-icons/fa";

function App() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={bgColor}>
        <Header />
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Flex align="center" justify="center" gap={3} mb={4}>
                <Icon as={FaRobot} w={10} h={10} color={accentColor} />
                <Heading as="h1" size="2xl" color={textColor}>
                  Ask Me Anything
                </Heading>
              </Flex>
              <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
                I'm Linda, your personal AI assistant. I can help you with
                various tasks and answer your questions. Feel free to ask me
                anything!
              </Text>
            </Box>
            <ChatInterface />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
