import React, {useState,useEffect} from "react";
import {FormControl, FormLabel} from '@chakra-ui/react';
import {Input} from '@chakra-ui/input';
import { Button } from "@chakra-ui/button";
import {VStack} from '@chakra-ui/layout';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import SliderInput from '../1ComponentHelper/SliderInput';
import GameModes from "../1ComponentsMain/GameModes";
import { checkValidInput, send_user_guess, clickHandler, FetchRandomNumber, render_guess_data, render_hint_data, easy_mode_click_handler} from "../1Functions/ClientFunctions";
import './GuessSubmitCSS.css'

const GuessSubmit = () => {
    const toast = useToast();
    const [loading, setLoading] = useState();
    const [guess, setGuess] = useState();
    const [takeaguess, setTakeAGuess] = useState();
    const [randomNumber, setRandomNumber] = useState();
    const config = {"Content-type": "application/json"};
    const [currentGameDataArray, setCurrentGameDataArray] = useState([]);
    const [hintsArray, setHintsArray] = useState([]);
    let render_hints;
    let round_counter = 1;
    let guess_evaluation;
    let current_game_mode;
    let reload = false;
    const game_modes = {a: 'easy', b: 'super_easy', c: 'hard', d: 'super_hard'};

    useEffect(()=> {
        try {
            const fetchData = async() => {
                console.log('in fetch');
                const { data } = await axios({
                    method: 'put',
                    url: 'http://127.0.0.1:9991/update-vars',
                    data: {
                        hi_num_reset: '9999',
                        low_num_reset: '0000',
                    },
                    config
                }).then((res) => {
                    console.log(res.data);
                    console.log('in the then');
                })
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

    FetchRandomNumber(axios, setRandomNumber, toast);
    const clickHandler = async () => {
        checkValidInput(guess, toast, setLoading, 4);
        send_user_guess (guess, axios, config, guess_evaluation, currentGameDataArray, setCurrentGameDataArray);
    };
    const pullCurrentModeHints = async (mode) => {
        console.log(mode);
        current_game_mode = mode;
        const easy_mode_click_handler = async (current_game_mode, guess, axios, config, render_hints, array, setArray) => {
            const data = await axios
              .post(
                "http://localhost:9991/get-hints",
                  {guess, current_game_mode},
                  config
              )
              .then((res)=> {
                console.log('in then');
                console.log(res.data);  
                render_hints = res.data
                console.log(current_game_mode);
                setArray(array => [... array, render_hints])        
            })
        } 
        easy_mode_click_handler(current_game_mode, guess, axios, config, render_hints, hintsArray, setHintsArray);
    //     renderhints = 
    //     <div>
    //     {hintsArray.map((h, i) => {     
    //       console.log(h);
    //     return <div className="guess-data" key={i}>
    //       Num: {h}{i} <br/>
    //       Caption: {'dddd'} <br/>
    //       Image: {} <br/>
    //     </div>})}
    //   </div>
    };

    return (
        <div>
            <GameModes func={pullCurrentModeHints} guess={guess} />
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
                {render_hint_data(hintsArray, current_game_mode)}
            </div>
            <div>
                {render_guess_data(currentGameDataArray, round_counter, 4)}
            </div>
        </div>
    );
};

export default GuessSubmit;



