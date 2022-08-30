import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import axios from "axios";


const AWSS3 = (props) => {
    // Set useState hooks for form fields
    const [email, setEmail] = useState()   
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState()
    const [status, setStatus] = useState(false)      
    // Set useState hook & function for showing & concealing password entry
    const [show, setShow] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState()
    const [userData, setUserData] = useState()
    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState("");
    const [gameId, setGameId] = useState();
    // console.log(user);
    // const [userEmail, setUserEmail] = useState(user.email);
    // const [userId, setUserId] = useState(user._id);

    const handleClick = () => setShow(!show)
    const toast = useToast();
    const history = useHistory();
    let passToken;
    let passUserData;
    let passGameId;

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
        try {
            const config = {
                headers: {
                    "Content-type":"application/json",
                },
            };
            const {data} = await axios.post(
                "http://localhost:9991/user/login",
                {email, password},
                config
            );
            setToken(data.token);
            passToken = data.token;
            console.log(data);
            console.log(data.msg, '<<<------------DATAMSG');
            console.log(typeof(data));
            sessionStorage.setItem("userData", JSON.stringify(data))
            setUserData(sessionStorage.getItem("userData", data));
            passUserData = sessionStorage.getItem("userData", data)
            console.log(passUserData);
            console.log(typeof(data), '<-------------DATA');
            console.log(data.authorizeUser.loginSucceded);
            toast(data.authorizeUser.loginSucceded);
            setLoading(false);
            const {result} = await axios.post(
                "http://localhost:9991/game/create-game",
                {passUserData},
                config
            ).then((result) => {
                console.log(result.data.game_id);
                sessionStorage.setItem("currentGameID", JSON.stringify(result.data.game_id))
                setGameId(sessionStorage.getItem("currentGameID", result.data));
                passGameId = sessionStorage.getItem("currentGameID", result.data)
                console.log(passGameId);
                history.push("/game")
            })
            
            
        }
        catch (error ){
            console.log(error.response.data);
            toast({
                title: 'Error Occured!',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }   
    }
    return (
        <VStack spacing="5px" color="black">
            <FormControl id="emailLog" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl id="passwordLog" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                    type={show ? "text" : "password"}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} //Set password to whats entered in password field
                    />
                    <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="green"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login1
            </Button>
            <Button
                variant="solid"
                colorScheme="green"
                width="100%"
                onClick={() => {
                    setEmail("notregistered@example.com");
                    setPassword("test");
                }}
            >
                Sign In Using Guest Credentials
            </Button>
        </VStack>
    );
}
export default AWSS3