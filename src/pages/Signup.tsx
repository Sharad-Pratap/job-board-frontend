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
import { FaUser, FaPhone, FaBuilding, FaEnvelope, FaUsers } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    email: '',
    employeeSize: '',
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

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', formData);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      toast({
        title: "Verify Yourself",
        description: "We've sent you OTP on your mobile and email.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        name: '',
        phone: '',
        companyName: '',
        email: '',
        employeeSize: '',
      });
      navigate('/verify-otp',{state: formData});
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to create account. Please try again.",
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
              <Heading as="h2" size="lg" color={textColor}>Sign Up</Heading>
              <Text color={textColor} textAlign="center">Lorem Ipsum is simply dummy text</Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUser color={inputPlaceholderColor} />} />
                <Input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Name" bg={inputBgColor} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaPhone color={inputPlaceholderColor} />} />
                <Input name="phone" value={formData.phone} onChange={handleInputChange} type="text" placeholder="Phone no." bg={inputBgColor} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaBuilding color={inputPlaceholderColor} />} />
                <Input name="companyName" value={formData.companyName} onChange={handleInputChange} type="text" placeholder="Company Name" bg={inputBgColor} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaEnvelope color={inputPlaceholderColor} />} />
                <Input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Company Email" bg={inputBgColor} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUsers color={inputPlaceholderColor} />} />
                <Input name="employeeSize" value={formData.employeeSize} onChange={handleInputChange} type="text" placeholder="Employee Size" bg={inputBgColor} />
              </InputGroup>
              <Text color={textColor} fontSize="sm" mt="4" textAlign="center">
                By clicking on proceed you will accept our{' '}
                <Link color={linkColor}>Terms & Conditions</Link>
              </Text>
              <Button colorScheme="blue" w="full" mt="4" onClick={handleSignup} isLoading={isLoading}>
                {isLoading ? <Spinner size="sm" /> : "Proceed"}
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
