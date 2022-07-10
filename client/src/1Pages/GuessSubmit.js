import {React, useState, useEffect} from "react";
import {FormControl, FormLabel} from '@chakra-ui/react';
import {Input} from '@chakra-ui/input';
import { Button } from "@chakra-ui/button";
import {VStack} from '@chakra-ui/layout';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import SliderInput from '../1ComponentHelper/SliderInput';

const GuessSubmit = () => {
    const toast = useToast();
    const [loading, setLoading] = useState();
    const [guess, setGuess] = useState(0);
    const [takeaguess, setTakeAGuess] = useState();
    const [randomNumber, setRandomNumber] = useState();
    const [userInputNumber, setUserInputNumber] = useState();
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
        console.log(Number(guess)); 
        console.log(guess, typeof(guess));
        const {data} = await axios.post(
            "http://127.0.0.1:9991/",
            {guess},
            config
        );
    }

    return (
        <VStack spacing="5px" color="black">
            <FormControl isRequired>
                <FormLabel htmlFor='first-name'>Take A Guess</FormLabel>
                <Input 
                    min={0} max={9999}
                    className='guessInput' 
                    id='takeaguess' 
                    type='number'
                    placeholder='Enter a 4 Digit Number From 0000 to 9999' 
                    value={takeaguess} 
                    onChange={(e) => setGuess(e.target.value)}
                />
            </FormControl>
            <SliderInput guess={guess}/>
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
