import { useState, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  Spinner,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { handleChat } from "../api/chat";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const userMessageBg = useColorModeValue("blue.50", "blue.900");
  const assistantMessageBg = useColorModeValue("gray.50", "gray.700");
  const inputBg = useColorModeValue("white", "gray.700");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await handleChat(input.trim());

      const assistantMessage: Message = {
        role: "assistant",
        content:
          response || "I apologize, but I couldn't process your request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg={bgColor}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      overflow="hidden"
      height="600px"
      display="flex"
      flexDirection="column"
      boxShadow="lg"
    >
      <Box flex="1" overflowY="auto" p={4}>
        <VStack spacing={4} align="stretch">
          <AnimatePresence>
            {messages.map((message, index) => (
              <MotionFlex
                key={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={messageVariants}
                transition={{ duration: 0.3 }}
                justify={message.role === "user" ? "flex-end" : "flex-start"}
                align="flex-start"
                gap={3}
              >
                {message.role === "assistant" && (
                  <Avatar
                    size="sm"
                    icon={<Icon as={FaRobot} />}
                    bg="blue.500"
                    color="white"
                  />
                )}
                <MotionBox
                  maxW="80%"
                  bg={
                    message.role === "user" ? userMessageBg : assistantMessageBg
                  }
                  p={4}
                  borderRadius="lg"
                  boxShadow="sm"
                  position="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    {message.timestamp.toLocaleTimeString()}
                  </Text>
                </MotionBox>
                {message.role === "user" && (
                  <Avatar
                    size="sm"
                    icon={<Icon as={FaUser} />}
                    bg="green.500"
                    color="white"
                  />
                )}
              </MotionFlex>
            ))}
          </AnimatePresence>
          {isLoading && (
            <MotionFlex
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              justify="flex-start"
              align="center"
              gap={3}
            >
              <Avatar
                size="sm"
                icon={<Icon as={FaRobot} />}
                bg="blue.500"
                color="white"
              />
              <Box bg={assistantMessageBg} p={4} borderRadius="lg">
                <Spinner size="sm" />
              </Box>
            </MotionFlex>
          )}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        p={4}
        borderTop="1px"
        borderColor={borderColor}
        bg={inputBg}
        position="sticky"
        bottom={0}
      >
        <form onSubmit={handleSubmit}>
          <HStack>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              size="lg"
              disabled={isLoading}
              bg={inputBg}
              _hover={{ bg: inputBg }}
              _focus={{ bg: inputBg }}
            />
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={isLoading}
              disabled={!input.trim() || isLoading}
              px={6}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon as={FaPaperPlane} />
            </Button>
          </HStack>
        </form>
      </MotionBox>
    </MotionBox>
  );
};

export default ChatInterface;
