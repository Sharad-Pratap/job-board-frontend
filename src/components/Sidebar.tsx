import React from 'react';
import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const iconColor = useColorModeValue('gray.500', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      w="16"
      bg={bgColor}
      borderRight="1px solid"
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
      alignItems="center"
      py="4"
      h="100vh"
    >
      <VStack spacing={4} mt={28}>
        <FaHome color={iconColor} size="24px" />
      </VStack>
    </Box>
  );
};

export default Sidebar;
