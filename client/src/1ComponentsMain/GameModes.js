import React, {useState}from 'react';
import {Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
// import { easy_mode_click_handler } from '../1Functions/ClientFunctions';
let current_game_mode;

function GameModes(props) {
    const [gamemode, setGamemode] = useState();

    const easy_mode_button_handler = () => {
        current_game_mode = props.func('easy');
        console.log(gamemode);
        console.log(current_game_mode);
        return current_game_mode;
    }
    const hard_mode_button_handler = () => {
        current_game_mode = props.func('hard');
        console.log(gamemode);
        console.log(current_game_mode);
        return current_game_mode;
    }

    const super_hard_mode_button_handler = () => {
        current_game_mode = props.func('super_hard');
        console.log(gamemode);
        console.log(current_game_mode);
        return current_game_mode;
    }
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
                    <TabPanel><Button colorScheme="green" width="30%" style={{ marginTop: 15 }} onClick='' isLoading={false}>Super Easy Hints</Button></TabPanel>
                    <TabPanel><Button colorScheme="green" width="30%" style={{ marginTop: 15 }} onClick={easy_mode_button_handler} isLoading={false}>Easy Hints</Button></TabPanel>
                    <TabPanel>Default</TabPanel>
                    <TabPanel><Button colorScheme="green" width="30%" style={{ marginTop: 15 }} onClick={hard_mode_button_handler} isLoading={false}>Hard Hints</Button></TabPanel>
                    <TabPanel><Button colorScheme="green" width="30%" style={{ marginTop: 15 }} onClick={super_hard_mode_button_handler} isLoading={false}>Super Hard Hints</Button></TabPanel>
                </TabPanels>
            </Tabs>
            </Box>
        </Container>
    );
}

export default GameModes;