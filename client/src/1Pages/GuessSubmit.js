import {React, useState, useEffect} from "react";
import {FormControl, FormLabel} from '@chakra-ui/react';
import {Input} from '@chakra-ui/input';
import { Button } from "@chakra-ui/button";
import {VStack} from '@chakra-ui/layout';
import axios from "axios";
import { useToast } from '@chakra-ui/react';

const GuessSubmit = () => {
    const toast = useToast();
    const [loading, setLoading] = useState();
    const [guess, setGuess] = useState();
    const [takeaguess, setTakeAGuess] = useState();
    const [randomNumber, setRandomNumber] = useState()
    const config = {"Content-type": "application/json"}

    useEffect(()=> {
        try {
            const fetchData = async() => {
                await axios
                .get("http://127.0.0.1:9991/random-number")
                .then((res) => {
                    setRandomNumber(res.data)
                    console.log(res.data);
                });
            }
            fetchData();
            
        }
        catch (errors) {
            toast({
                title: 'Error Occured!',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "bottom"
            });
        }

    }, []); 
    
    const click = async () => {
        console.log(randomNumber);

    }

    return (
        <VStack spacing="5px" color="black">
            <FormControl isRequired>
                <FormLabel htmlFor='first-name'>Take A Guess</FormLabel>
                <Input 
                    className='guessInput' 
                    id='takeaguess' 
                    placeholder='Enter a 4 Digit Number From 0000 to 9999' 
                    value={takeaguess} 
                    onChange={(e) => setGuess(e.target.value)}
                />
            </FormControl>
            <Button
                colorScheme="green"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={click}
                isLoading={loading}
                >
                Submit Your Guess
            </Button>
        </VStack>
    );
};

export default GuessSubmit;
