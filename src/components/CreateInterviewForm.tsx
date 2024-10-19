import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  Select,
  Button,
  useColorModeValue,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";

const CreateInterviewForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const toast = useToast();
    const token = localStorage.getItem('token')
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue]);
      setInputValue('');
      e.preventDefault(); 
    }
  };

  const handleTagClose = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    const formData = {
      title,
      description,
      experienceLevel,
      candidateEmails: tags,
      endDate,
    };

    try {
      const response = await fetch('http://localhost:8000/api/jobs/post-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful response
      toast({
        title: "Interview Created.",
        description: "Your interview data has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form fields
      setTitle('');
      setDescription('');
      setExperienceLevel('');
      setTags([]);
      setInputValue('');
      setEndDate('');

    } catch (error) {
      // Handle error
      toast({
        title: "Error.",
        description: "There was an error submitting your data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const labelColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      as="form"
      p="8"
      bg={bgColor}
      justifyContent="start"
      borderRadius="md"
      w={{ base: "50%" }}
      onSubmit={handleSubmit}
    >
      <Flex align="center" mb="6">
        <Text w="40" textAlign="right" color={labelColor} mr="4">
          Job Title
        </Text>
        <Input 
          placeholder="Enter Job Title" 
          flex="1" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </Flex>
      <Flex align="center" mb="6">
        <Text w="40" textAlign="right" color={labelColor} mr="4">
          Job Description
        </Text>
        <Textarea 
          placeholder="Enter Job Description" 
          flex="1" 
          h="32" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </Flex>
      <Flex align="center" mb="6">
        <Text w="40" textAlign="right" color={labelColor} mr="4">
          Experience Level
        </Text>
        <Select 
          placeholder="Select Experience Level" 
          flex="1" 
          value={experienceLevel} 
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option>Internship</option>
          <option>Junior</ option>
          <option>Mid-level</option>
          <option>Senior</option>
          <option>Lead</option>
        </Select>
      </Flex>
      <Flex align="center" mb="6">
        <Text w="40" textAlign="right" color="gray.500" mr="4">
          Add Candidate
        </Text>
        <Flex flex="1" align="center" border="1px" borderColor="gray.300" borderRadius="md" p={1}>
          <HStack spacing={1} flexWrap="wrap" flex="1">
            {tags.map((tag, index) => (
              <Tag
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="green"
                key={index}
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleTagClose(tag)} />
              </Tag>
            ))}
            <Input 
              placeholder="xyz@gmail.com" 
              type="email" 
              value={inputValue} 
              onChange={handleInputChange} 
              onKeyDown={handleKeyDown} 
              flex="1" 
              minWidth="120px" 
              border="none" 
              _focus={{ outline: 'none' }} 
            />
          </HStack>
        </Flex>
      </Flex>
      <Flex align="center" mb="6">
        <Text w="40" textAlign="right" color={labelColor} mr="4">
          End Date
        </Text>
        <Input 
          type="date" 
          flex="1" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </Flex>
      <Flex justify="flex-end">
        <Button colorScheme="blue" type="submit">Send</Button>
      </Flex>
    </Box>
  );
};

export default CreateInterviewForm;