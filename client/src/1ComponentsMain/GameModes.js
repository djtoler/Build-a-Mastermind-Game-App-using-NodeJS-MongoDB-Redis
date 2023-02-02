import React, { useState } from "react";
import {Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import ProfileAvatar from "../1ComponentsMain/ProfileAvatar";
import ProfileBadge from '../1ComponentHelper/ProfileBadge';
import UserAvatarBadge from '../1ComponentHelper/UserAvatarBadge';

function GameModes(props) {
    let currentGameMode;
    const easyModeButtonHandler = async () => {sessionStorage.setItem("currentMode", ('easy')); return currentGameMode = await props.func('easy')}
    const hardModeButtonHandler = async () => {sessionStorage.setItem("currentMode", ('hard')); return currentGameMode = await props.func('hard')}
    const superHardModeButtonHandler = async () => {sessionStorage.setItem("currentMode", ('superHard')); return currentGameMode = await props.func('superHard')}
    const superEasyModeButtonHandler = async () => {sessionStorage.setItem("currentMode", ('superEasy')); return currentGameMode = await props.func('superEasy')}

    return (
        <div style={{ background: "black" }}>
            <Container maxWidth="xl" centerContent>
            <div style={{ background: "black", border:"#27a102 2px solid", borderRadius: "10px" }}>
                <Box d="flex" justifyContent="center" p={3} bg="black" w="900px" m="40px 0 15px 0" borderRadius="lg"  marginTop="20px" > 
                <ProfileBadge uploadedImg="User_Avatars/jhzsmkeuixvhcs4gnetb.jpg" />
                <Text fontSize="7xl"  fontFamily="Work sans" color="green"> Mastermind Game </Text>
                </Box>
            </div>
                <Box bg="black" w="100%" p={4} borderRadius="lg" borderWidth="1px" color="green" >
                <Tabs variant="soft-rounded" colorScheme="green">
                    <TabList mb="1em">
                    <Tab width="50%">SuperEasy</Tab>
                    <Tab width="50%">Easy</Tab>
                    <Tab width="50%">Default</Tab>
                    <Tab width="50%">Hard</Tab>
                    <Tab width="50%">SuperHard</Tab>
                    </TabList>

                    <TabPanels>
                    <TabPanel>
                        <Button colorScheme="white" color={"green"} backgroundColor={"white"} width="100%" style={{ marginTop: 15 }} onClick={superEasyModeButtonHandler} isLoading={false}>Super Easy Hints</Button>
                    </TabPanel>
                    <TabPanel>
                        <Button colorScheme="white" color={"green"} backgroundColor={"white"} width="100%" style={{ marginTop: 15 }} onClick={easyModeButtonHandler} isLoading={false}>Easy Hints</Button>
                    </TabPanel>
                    <TabPanel>Default</TabPanel>
                    <TabPanel>
                        <Button colorScheme="white" color={"green"} backgroundColor={"white"} width="100%" style={{ marginTop: 15 }} onClick={hardModeButtonHandler} isLoading={false}>Hard Hints</Button>
                    </TabPanel>
                    <TabPanel>
                        <Button colorScheme="white" color={"green"} backgroundColor={"white"} width="100%" style={{ marginTop: 15 }} onClick={superHardModeButtonHandler} isLoading={false}>Super Hard Hints</Button>
                    </TabPanel>
                    </TabPanels>
                </Tabs>
                </Box>
            </Container>
        </div>
    );
}

export default GameModes;