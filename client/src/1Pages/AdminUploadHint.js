import { useHistory } from 'react-router';
import React, { useState } from "react";
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Redis from "../../src/1ComponentsMain/Redis";


const AdminUploadHint = () => {
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
          Upload Hint Pictures
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
            <Tab width="50%">Redis</Tab>
            <Tab width="50%">Memcached</Tab>
            <Tab width="50%">AWS S3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Redis />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};


export default AdminUploadHint;