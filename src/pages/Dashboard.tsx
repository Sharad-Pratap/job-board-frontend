// src/pages/Dashboard.tsx
import React from 'react';
import { ChakraProvider, Flex, Box, Button } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    

    const handleCreateInterviewClick = () => {
      navigate('/create-interview');
    };
  return (
    <ChakraProvider>
      <Flex h="100vh">
        <Sidebar />
        <Box flex="1" display="flex" flexDirection="column">
          <Navbar isLoggedIn={true} />
          <Box p="12">
          <Button colorScheme="blue" onClick={handleCreateInterviewClick}>
            Create Interview
          </Button>
        </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Dashboard;