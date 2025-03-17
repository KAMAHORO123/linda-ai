import {
  Box,
  Flex,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      py={4}
      px={6}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="container.xl"
        mx="auto"
      >
        <Flex align="center" gap={3}>
          <Icon as={FaRobot} w={8} h={8} color="blue.500" />
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={textColor}
            letterSpacing="tight"
          >
            Linda AI
          </Text>
        </Flex>
        <Text
          fontSize="sm"
          color="gray.500"
          display={{ base: "none", md: "block" }}
        >
          Your Personal AI Assistant
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
