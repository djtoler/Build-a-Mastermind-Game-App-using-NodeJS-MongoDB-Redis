import {React, useState} from "react";
import {FormControl, FormLabel} from '@chakra-ui/react';
import {Input} from '@chakra-ui/input';
import { Button } from "@chakra-ui/button";
import {VStack} from '@chakra-ui/layout';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import SliderInput from '../1ComponentHelper/SliderInput';
import GameModes from "../1ComponentsMain/GameModes";
import { checkValidInput, send_user_guess, clickHandler, FetchRandomNumber, render_guess_data} from "../1Functions/ClientFunctions";
import './GuessSubmitCSS.css'

const GuessSubmit = () => {
    const toast = useToast();
    const [loading, setLoading] = useState();
    const [guess, setGuess] = useState();
    const [takeaguess, setTakeAGuess] = useState(undefined);
    const [randomNumber, setRandomNumber] = useState();
    const config = {"Content-type": "application/json"};
    const [currentGameDataArray, setCurrentGameDataArray] = useState([]);
    let round_counter = 1;
    let guess_evaluation;

    FetchRandomNumber(axios, setRandomNumber, toast);
    const clickHandler = async () => {
        checkValidInput(guess, toast, setLoading, 4);
        send_user_guess (guess, axios, config, guess_evaluation, currentGameDataArray, setCurrentGameDataArray);
        setGuess('');
    };

    return (
        <div>
            <GameModes/>
            <VStack spacing="5px" color="black">
            <FormControl isRequired>
                <FormLabel htmlFor='first-name'></FormLabel>
                <Input 
                    min={0} max={9999}
                    className='guessInput' 
                    id='takeaguess' 
                    type='number'
                    placeholder='Enter a 4 Digit Number From 0000 to 9999' 
                    value={guess} 
                    onChange={(e) => setGuess(e.target.value)}
                />
            </FormControl>
            <SliderInput guess={guess}/>
            <Button
                colorScheme="green"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={clickHandler}
                isLoading={loading}
                >
                Submit Your Guess
            </Button>
            </VStack> 
            <div>
                {render_guess_data(currentGameDataArray, round_counter, 5)}
            </div>
        </div>
    );
};

export default GuessSubmit;



