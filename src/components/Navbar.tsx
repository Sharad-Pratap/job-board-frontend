import React from "react";
import {
  Flex,
  Box,
  Link,
  Button,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  Avatar,
  Text,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import cuvettelogo from "../assets/cuvettelogo.svg";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast({
      title: "Logout Success.",
      description: "Yo've logged out your account.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
const userDataString = localStorage.getItem('userData');
const userdata = userDataString ? JSON.parse(userDataString) : null;
console.log(userdata.company.name, "userdata");
localStorage.setItem('token', userdata.token)
  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      p={4}
      bg={bgColor}
      color={textColor}
      borderBottom={isLoggedIn ? "1px solid" : "none"} // Conditionally show border
      borderColor={useColorModeValue("gray.200", "gray.700")}
      zIndex={10}
    >
      <Box>
        <img src={cuvettelogo} alt="Cuvette Logo" style={{ height: "40px" }} />
      </Box>
      <Flex align="center">
        {isLoggedIn ? (
          <>
            <Link href="/contact" color={textColor} fontWeight="bold" mx={2}>
              Contact
            </Link>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FaCaretDown />}
                variant="ghost"
                color={textColor}
              >
                <Flex align="center" gap="2">
                  <Avatar size="xs" bg="gray.400" />
                  <Text>{userdata.company.name ? userdata.company.name : 'Your Name'}</Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Link href="/contact" color={textColor} fontWeight="bold" mx={2}>
            Contact
          </Link>
        )}
        <Button onClick={toggleColorMode} ml={4}>
          Toggle Theme
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
