import {
  ChakraProvider,
  Box,
  VStack,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ChatInterface from "./components/ChatInterface";
import Header from "./components/Header";

function App() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={bgColor}>
        <Header />
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Heading as="h1" size="2xl" color={textColor} mb={4}>
                Ask Me Anything
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Get to know me through AI-powered answers
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
