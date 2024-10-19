import React, { useState } from "react";
import {
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  VStack,
  Heading,
  Box,
  useColorMode,
  useColorModeValue,
  InputRightElement,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FaMailBulk, FaPhone, FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp: React.FC = () => {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailOTP, setEmailOTP] = useState(""); // State for email OTP
  const [mobileOTP, setMobileOTP] = useState(""); // State for mobile OTP
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const inputPlaceholderColor = useColorModeValue("gray.400", "gray.500");
  localStorage.setItem("userData", JSON.stringify(formData));

  const handleVerifyOTP = async (type: "email" | "phone") => {
    setIsLoading(true);
    const otp = type === "email" ? emailOTP : mobileOTP; // Get the correct OTP based on type
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/verify-otp",
        {
          email: formData.email, // Use the email from formData
          otp,
          type,
        }
      );
      if (response.status === 200) {
        type === "email" ? setEmailVerified(true) : setMobileVerified(true);
        toast({
          title: "Verified.",
          description: `${type} verified successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Check if both email and mobile are verified
        if (emailVerified && type === "phone") {
          navigate("/dashboard", { state: formData }); // Redirect to dashboard
        }
        const data = response.data;
        localStorage.setItem("token", data.token); // Store the token
        localStorage.setItem("userData", JSON.stringify(data));
      } else {
        toast({
          title: "Verification Failed.",
          description: "Invalid OTP.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: "Verification failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" minH="100vh" w="full" bg={bgColor}>
      <Navbar isLoggedIn={isLoggedIn} />
      <Flex justifyContent="center" alignItems="center" flex="1" px={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          w="full"
          px={30}
        >
          <Box mb={{ base: 8, md: 0 }} w={{ base: "full", md: "50%" }}>
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              mb="4"
              color="blue.600"
            >
              Cuvette
            </Text>
            <Text color={textColor} fontSize={{ base: "md", md: "lg" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </Box>
          <Box
            w={{ base: "full", md: "lg" }}
            p="8"
            bg={boxBgColor}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
          >
            <VStack spacing="4">
              <Heading as="h2" size="lg" color={textColor}>
                VerifyOtp
              </Heading>
              <Text color={textColor} textAlign="center">
                Verify Email and Mobile OTP
              </Text>

              {/* Email OTP Input */}
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaMailBulk color={inputPlaceholderColor} />}
                />
                <Input
                  type="text"
                  placeholder="Enter Email OTP"
                  bg={inputBgColor}
                  value={emailOTP}
                  onChange={(e) => setEmailOTP(e.target.value)}
                />
                {emailVerified && (
                  <InputRightElement
                    children={<FaCheckCircle color="green.700" />}
                  />
                )}
              </InputGroup>
              <Button
                colorScheme="blue"
                w="full"
                onClick={() => handleVerifyOTP("email")}
                isLoading={isLoading}
              >
                {isLoading ? <Spinner /> : "Verify Email OTP"}
              </Button>

              {/* Mobile OTP Input */}
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaPhone color={inputPlaceholderColor} />}
                />
                <Input
                  type="text"
                  placeholder="Enter Mobile OTP"
                  bg={inputBgColor}
                  value={mobileOTP}
                  onChange={(e) => setMobileOTP(e.target.value)}
                />
                {mobileVerified && (
                  <InputRightElement
                    children={<FaCheckCircle color="green.700" />}
                  />
                )}
              </InputGroup>
              <Button
                colorScheme="blue"
                w="full"
                onClick={() => handleVerifyOTP("phone")}
                isLoading={isLoading}
              >
                {isLoading ? <Spinner /> : "Verify Mobile OTP"}
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerifyOtp;
