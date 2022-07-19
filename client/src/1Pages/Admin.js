import React, {useState,useEffect} from "react";
import { Button } from "@chakra-ui/button";



import React from 'react'

function Admin() {
    const [loading, setLoading] = useState(false);
    const [digit, setDigit] = useState(false);
    const [picture, setPicture] = useState();   

    const postDetails = (pictures) => {
        setLoading(true);

        if (pictures === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              return;
        }

        if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
            // set data to a new FormData object (from WebAPIs)
            const formData = new FormData();
            // use append method to create key/value pairs for the object
            formData.append("file", pictures);
            formData.append("digit", digit);
            formData.append("cloud_name", "dcrwhj71h");
            // use fetch to send data to picture mgt. url through a post method
            fetch("https://api.cloudinary.com/v1_1/dcrwhj71h/image/upload", {
                method: "post",
                body: formData,
            })
            .then((res) => res.json())
            .then((formData) => {
                setPicture(formData.url.toString());
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        }
        else {
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }
    } 
 

  return (
    <div>
        <FormControl id="picture" >
            <FormLabel>Upload Hint Picture</FormLabel>
            <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e)=>postDetails(e.target.files[0])}
            />
        </FormControl>
    </div>
  )
}

export default Admin
