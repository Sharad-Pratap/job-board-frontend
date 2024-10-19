import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar isLoggedIn={false}  />
      <Box p={8} textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>Welcome to Job Board</Heading>
        <Text fontSize="xl" mb={4}>Find your next job opportunity here!</Text>
        <Button as={Link} to="/login" colorScheme="teal" mr={4}>
          Login
        </Button>
        <Button as={Link} to="/register" colorScheme="teal">
          Register
        </Button>
      </Box>
    </>
  );
};

export default Home;
