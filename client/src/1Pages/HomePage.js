import { useHistory } from 'react-router';
import React, { useState } from "react";
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Login from "../1ComponentsMain/Login";
import Register from "../1ComponentsMain/Register";
import UserAvatarBadge from "../1ComponentHelper/UserAvatarBadge";
import ProfileBadge from "../1ComponentHelper/ProfileBadge";

const HomePage = () => {
  const history = useHistory();
  let userAvatar = sessionStorage.getItem("userAvatar")
  console.log(userAvatar, '<<<---- user avatar');
  
  function LandingPageClickHandler() {
    history.push("/game")
  }
  
  return (
<div style={{ backgroundColor: "#000", color: "#00FF00", fontFamily: "'Courier New', monospace" }}>
  <Container maxWidth="xl" centerContent>
    <button onClick={LandingPageClickHandler} style={{ backgroundColor: "#00FF00", color: "#000", border: "2px solid #00FF00", borderRadius: "5px" }}>Click me!</button>

    <Box d="flex" justifyContent="center" p={3} bg="#00FF00" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" boxShadow="2px 2px 10px 0px #000">
      <Text fontSize="4xl" fontFamily="'Courier New', monospace" color="#000">MasterMind Game</Text>
    </Box>
    <Box
      bg="#00FF00"
      w="100%"
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      color="#000"
      boxShadow="2px 2px 10px 0px #00FF00"
    >
      <Tabs variant="soft-rounded" colorScheme="#00FF00">
        <TabList mb="1em">
          <Tab width="50%" backgroundColor="black" color="green">Login</Tab>
          <Tab width="50%" backgroundColor="black" color="green">Register</Tab>
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
</div>
  );
};


export default HomePage;