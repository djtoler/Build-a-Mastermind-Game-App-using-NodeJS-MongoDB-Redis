import React, { useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/button";
import { InputRightElement } from "@chakra-ui/input";

function Logout() {
    const logoutUser = async (e, req, res) => {
        try {
            const res = await axios.get("http://localhost:9991/user/logout");
            console.log(res);
        } catch (error) {
            console.log(error.response);
        }
    }
  return (
    <div>               
        <Button colorScheme="green" size="sm" style={{ marginTop: 15 }}  onClick={logoutUser}> Logout</Button>
    </div>
  )
}

export default Logout