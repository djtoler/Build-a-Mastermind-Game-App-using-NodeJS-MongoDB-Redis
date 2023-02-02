import React, {useState,useEffect} from "react";
import {FormControl, FormLabel} from '@chakra-ui/react';
import {Input} from '@chakra-ui/input';
import { Button } from "@chakra-ui/button";
import {VStack} from '@chakra-ui/layout';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import SliderInput from '../1ComponentHelper/SliderInput';
import GameModes from "../1ComponentsMain/GameModes";
import StartGameButton from "../1ComponentHelper/StartGameButton";
import { checkValidInput, sendUserGuessToServer, FetchRandomNumber, displayGuessAttemptData, returnHintForCurrentGameMode, easy_mode_click_handler} from "../1Functions/ClientFunctions";
import './GuessSubmitCSS.css'
import UserAvatarBadge from "../1ComponentHelper/UserAvatarBadge";
import ProfileBadge from "../1ComponentHelper/ProfileBadge";

const GuessSubmit = (props) => {
    const [loading, setLoading] = useState();
    const [mostCurrentUserGuess, setMostCurrentUserGuess] = useState();
    const [takeaguess, setTakeAGuess] = useState();
    const [randomNumber, setRandomNumber] = useState();
    const config = {"Content-type": "application/json"};
    const [currentGameDataArray, setCurrentGameDataArray] = useState([]);
    const [hintsArray, setHintsArray] = useState([]);
    const [hints, setHints] = useState([]);
    const toast = useToast();
    let renderHints;
    let numberOfRoundsPlayed = 1;
    let easyHintButtonClickCounter = 0;
    let guess_evaluation;
    let theCurrentGamesMode;
    let current_user_obj;
    const game_modes = {a: 'easy', b: 'super_easy', c: 'hard', d: 'super_hard'};
    
    const requestObjectToResetNums = {method: 'put', url: 'http://127.0.0.1:9991/game/update-vars', data: {resetHighestNumberBackTo7777: '7777', resetLowestNumberBackTo0000: '0000',}, config}
    const toastResponseError = {title: 'Error Occured!',  status: 'error', duration: 9000, isClosable: true, position: "bottom"}

    const resetEasyModeNumbers = async() => {
        console.log('in fetch');
        const { data } = await axios(requestObjectToResetNums)
            .then((res) => {
                console.log('in the resetEasyModeNumbers then, RESPONSE DATA ==>', res.data); 
                alert('game over resetting easy hint numbers')
            })
    }

    // useEffect(()=> {
    //     try {sessionStorage.setItem("currentMode", "default"); resetEasyModeNumbers();}
    //     catch (errors) {toast(toastResponseError)}
    // },[]); 
    useEffect(()=> {
        try {
            sessionStorage.setItem("currentMode", "default"); 
            console.log(sessionStorage.getItem("currentMode")); 
            resetEasyModeNumbers()
        }
        catch (errors) {toast(toastResponseError)}
    },[]); 

    FetchRandomNumber(axios, setRandomNumber, toast);
    
    const clickHandler = async () => {
        checkValidInput(mostCurrentUserGuess, toast, setLoading, 4);
        sendUserGuessToServer (mostCurrentUserGuess, axios, config, guess_evaluation, currentGameDataArray, setCurrentGameDataArray);
    };


    const returnHintsFromCurrentGamesMode = async (mode) => {
        console.log(mode);
        easyHintButtonClickCounter++
        sessionStorage.setItem("easyHintButtonClickCounter", easyHintButtonClickCounter);
        // sessionStorage.setItem("currentMode", (mode));
        console.log(sessionStorage.getItem("currentMode"));
        console.log(sessionStorage.getItem("easyHintButtonClickCounter"));
        
        let theCurrentGamesMode = sessionStorage.getItem("currentMode");
        console.log(mode, theCurrentGamesMode);
        console.log("easyHintButtonClickCounter-->", easyHintButtonClickCounter);
        let theCurrentGamesRandomNumber = sessionStorage.getItem("currentRandomNumber")
        
        const easy_mode_click_handler = async (theCurrentGamesMode, mostCurrentUserGuess, axios, config, renderHints, array, setArray) => {
            const data = await axios
              .post(
                "http://localhost:9991/game/get-hints",
                  {mostCurrentUserGuess, theCurrentGamesMode, theCurrentGamesRandomNumber, easyHintButtonClickCounter},
                  config
              )
              .then((res)=> {
                console.log('in then');
                console.log(res.data);  
                renderHints = res.data.hint
                console.log(theCurrentGamesMode);
                console.log(res.data.hint);
                setArray(array => [... array, renderHints])        
            })
        } 
        await easy_mode_click_handler(theCurrentGamesMode, mostCurrentUserGuess, axios, config, renderHints, hintsArray, setHintsArray);
    };


    return (
        <div>
            <GameModes func={returnHintsFromCurrentGamesMode} mostCurrentUserGuess={mostCurrentUserGuess} />
            {/* <StartGameButton /> */}
            <VStack spacing="5px" color="black">
            <FormControl isRequired>
                <FormLabel htmlFor='first-name'></FormLabel>
                <Input 
                    min={0} max={9999}
                    className='guessInput' 
                    id='takeaguess' 
                    type='number'
                    placeholder='Enter a 4 Digit Number From 0000 to 9999' 
                    value={mostCurrentUserGuess} 
                    onChange={(e) => setMostCurrentUserGuess(e.target.value)}
                />
            </FormControl>
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
                {returnHintForCurrentGameMode(hintsArray, theCurrentGamesMode)}
            </div>
            <div>
                {displayGuessAttemptData(currentGameDataArray, numberOfRoundsPlayed, 4)}
            </div>
        </div>
    );
};

export default GuessSubmit;



