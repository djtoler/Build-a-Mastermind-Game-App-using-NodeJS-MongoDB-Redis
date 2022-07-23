import { useHistory } from 'react-router';
import React, { useState } from "react";
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Login from "../../src/1ComponentsMain/Login";
import Register from "../../src/1ComponentsMain/Register";

const HelloWorld = () => {
  const history = useHistory();
  
  function LandingPageClickHandler() {
    history.push("/game")
  }
  
  return (
    <Container maxWidth="xl" centerContent>
      <button onClick={LandingPageClickHandler}>Click me!</button>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          MasterMind Game
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
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};


export default HelloWorld;