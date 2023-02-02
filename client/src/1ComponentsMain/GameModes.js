import React from 'react';
import {Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";

function GameModes(props) {
    let currentGameMode;
    const easyModeButtonHandler = async () => {sessionStorage.setItem("currentMode", ('easy')); return currentGameMode = await props.func('easy')}
    const hardModeButtonHandler = async () => {sessionStorage.setItem("currentMode", ('hard')); return currentGameMode = await props.func('hard')}
    const superHardModeButtonHandler = async () => {sessionStorage.setItem("currentMode", ('superHard')); return currentGameMode = await props.func('superHard')}
    const superEasyModeButtonHandler = async () => {sessionStorage.setItem("currentMode", ('superEasy')); return currentGameMode = await props.func('superEasy')}

    return (
        <Container maxWidth="xl" centerContent>

            <Box d="flex" justifyContent="center" p={3} bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" marginTop="20px" > 
                <Text fontSize="4xl" fontFamily="Work sans" color="black"> Mastermind Game </Text>
            </Box>

            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="black" >
                <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList mb="1em">
                        <Tab width="50%">SuperEasy</Tab>
                        <Tab width="50%">Easy</Tab>
                        <Tab width="50%">Default</Tab>
                        <Tab width="50%">Hard</Tab>
                        <Tab width="50%">SuperHard</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel><Button colorScheme="green" width="30%" style={{ marginTop: 15 }} onClick={superEasyModeButtonHandler} isLoading={false}>Super Easy Hints</Button></TabPanel>
                        <TabPanel><Button colorScheme="green" width="30%" style={{ marginTop: 15 }} onClick={easyModeButtonHandler} isLoading={false}>Easy Hints</Button></TabPanel>
                        <TabPanel>Default</TabPanel>
                        <TabPanel><Button colorScheme="green" width="30%" style={{ marginTop: 15 }} onClick={hardModeButtonHandler} isLoading={false}>Hard Hints</Button></TabPanel>
                        <TabPanel><Button colorScheme="green" width="30%" style={{ marginTop: 15 }} onClick={superHardModeButtonHandler} isLoading={false}>Super Hard Hints</Button></TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            
        </Container>
    );
}

export default GameModes;