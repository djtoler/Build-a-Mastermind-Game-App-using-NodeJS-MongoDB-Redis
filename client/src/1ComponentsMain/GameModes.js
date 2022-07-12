import React from 'react';
import {Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';

function GameModes() {
  return (
    <Container maxWidth="xl" centerContent>
        <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        marginTop="20px"
        >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
            Mastermind Game
        </Text>
        </Box>

        <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
        >
        <Tabs variant="soft-rounded" colorScheme="green">
            <TabList mb="1em">
                <Tab width="50%">SuperEasy</Tab>
                <Tab width="50%">Easy</Tab>
                <Tab width="50%">Default</Tab>
                <Tab width="50%">Hard</Tab>
                <Tab width="50%">SuperHard</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>Super Easy</TabPanel>
                <TabPanel>Easy</TabPanel>
                <TabPanel>Default</TabPanel>
                <TabPanel>Hard</TabPanel>
                <TabPanel>SuperHard</TabPanel>
            </TabPanels>
        </Tabs>
        </Box>
    </Container>
);
}

export default GameModes;