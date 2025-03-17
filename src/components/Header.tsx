import {
  Box,
  Flex,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { FaRobot, FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconColor = useColorModeValue("gray.600", "gray.300");

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
        <Flex align="center" gap={4}>
          <Text
            fontSize="sm"
            color="gray.500"
            display={{ base: "none", md: "block" }}
          >
            Your Personal AI Assistant
          </Text>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
            color={iconColor}
            _hover={{ bg: "transparent", color: "blue.500" }}
            transition="all 0.2s"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
