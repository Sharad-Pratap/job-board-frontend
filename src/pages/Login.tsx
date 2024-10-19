import React, { useState } from 'react';
import {
  ChakraProvider,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Link,
  VStack,
  Heading,
  Box,
  useColorMode,
  useColorModeValue,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FaUser, FaPhone, FaRegEye, FaBuilding, FaEnvelope, FaUsers } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.900');
  const boxBgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const inputBgColor = useColorModeValue('gray.100', 'gray.700');
  const linkColor = useColorModeValue('blue.500', 'blue.300');
  const inputPlaceholderColor = useColorModeValue('gray.400', 'gray.500');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', formData);
      const token = response.data;
      console.log(token, "token")
      toast({
        title: "Login Success.",
        description: "Yo've logged in your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        email: '',
        password: '',
      });
      navigate('/dashboard');
    //   localStorage.setItem('token',token )
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to login account. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh" w='full' bg={bgColor}>
      <Navbar isLoggedIn={false} />
      <Flex justifyContent='center' alignItems='center' flex="1" px={4}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          w="full"
          px={30}
        >
          <Box mb={{ base: 8, md: 0 }} textAlign={{ base: 'center', md: 'left' }} w={{ base: 'full', md: '50%' }}>
            <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" mb="4" color="blue.600">
              Cuvette
            </Text>
            <Text color={textColor} fontSize={{ base: 'md', md: 'lg' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
          </Box>
          <Box w={{ base: 'full', md: 'lg' }} p="8" bg={boxBgColor} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <VStack spacing="4">
              <Heading as="h2" size="lg" color={textColor}>Login</Heading>
              <Text color={textColor} textAlign="center">Lorem Ipsum is simply dummy text</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUser color={inputPlaceholderColor} />} />
                <Input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email" bg={inputBgColor} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaRegEye color={inputPlaceholderColor} />} />
                <Input name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Password" bg={inputBgColor} />
                </InputGroup>
              
              <Button colorScheme="blue" w="full" mt="4" onClick={handleLogin} isLoading={isLoading}>
                {isLoading ? <Spinner size="sm" /> : "Proceed"}
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
