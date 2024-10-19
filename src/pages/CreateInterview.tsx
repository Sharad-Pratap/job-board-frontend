import React from 'react';
import { Box, Flex, Input, Textarea, Select, Button, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CreateInterviewForm from '../components/CreateInterviewForm';

const CreateInterview: React.FC = () => {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1">
        <Navbar isLoggedIn={true} />
        <CreateInterviewForm/>
      </Box>
    </Flex>
  );
};

export default CreateInterview;
