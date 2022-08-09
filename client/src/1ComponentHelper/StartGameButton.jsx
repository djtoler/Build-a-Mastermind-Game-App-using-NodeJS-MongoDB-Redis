import axios from "axios";
import React, { useState } from "react";
import { Button } from "@chakra-ui/button";


const StartGameButton = () => {
    // const [user, setUser] = useState(sessionStorage.getItem("userInfo"));
    // console.log(user);
    // const [userEmail, setUserEmail] = useState(user.email);
    // const [userId, setUserId] = useState(user._id);
    // const config = {headers: { "Content-type":"application/json"}};
    // let e = userEmail
    // let i = userId

    // console.log(typeof(userEmail));
    // console.log(userId);

    const StartGameButtonHandler = async (res, req) => {
        const {data} = await axios.post(
            "http://localhost:9991/game/create-game",
            // {userEmail, userId},
            // config
        ).then((data) => {
            console.log(res.data);
            sessionStorage.setItem("current_game_id", res.data)
        })
    }
  return (
    <div>
      <Button
        colorScheme="blue"
        width="40%"
        style={{ marginTop: 15 }}
        onClick={StartGameButtonHandler}
      >Start Game</Button>
    </div>
  );
};

export default StartGameButton;
