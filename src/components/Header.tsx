import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={4}
      py={4}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        align="center"
        justify="space-between"
      >
        <Box fontSize="xl" fontWeight="bold">
          Your Name
        </Box>
        <Flex align="center" gap={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
          />
          <IconButton
            aria-label="GitHub"
            icon={<FaGithub />}
            as="a"
            href="https://github.com/yourusername"
            target="_blank"
            variant="ghost"
            size="md"
          />
          <IconButton
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            as="a"
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            variant="ghost"
            size="md"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
