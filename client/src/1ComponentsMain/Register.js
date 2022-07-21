import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useMutate } from 'restful-react';
import { Redirect } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import axios from "axios";

const Register = () => {

    // const Upload = () => {
    //     const [selectedImage, setSelectedImage] = useState();
    //     const { mutate: uploadImage } = useMutate({
    //       verb: 'POST',
    //       path: 'image-upload'
    //     });

    //     const handleChange = event => {
    //         setSelectedImage(event.target.files[0]);
    //       }
        
    //       const handleImageUpload = () => {
    //         if (!selectedImage) { return; }
    //         const formData = new FormData();
    //         formData.append('image', selectedImage);
        
    //         uploadImage(formData)
    //           .then(uploadedImage => {
    //             console.log(uploadedImage);
    //           })
    //           .catch(_ => {
    //             console.log('Oooops, something went wrong!')
    //           })
    //       }
    //  // Set useState hooks for form fields
    //  const [name, setName] = useState()
    //  const [email, setEmail] = useState()   
    //  const [password, setPassword] = useState()   
    //  const [confirmPassword, setConfirmPassword] = useState()
    //  const [picture, setPicture] = useState()   
    //  const [photo, setPhoto] = useState()  
    //  const pic_config = { "Content-Type": "multipart/form-data" }
 
     
    //  const [loading, setLoading] = useState(false)
 
    //  const toast = useToast();
    //  const history = useHistory();
      
    //  // Set useState hook & function for showing & concealing password entry
    //  const [show, setShow] = useState(false)
    //  const handleClick = () => setShow(!show)
      
      
    //  const postDetails = async (pictures) => {
    //      setLoading(true);
 
    //      if (pictures === undefined) {
    //          toast({
    //              title: "Please Select an Image!",
    //              status: "warning",
    //              duration: 5000,
    //              isClosable: true,
    //              position: "bottom",
    //            });
    //            return;
    //      }
    //      console.log(pictures);
 
    //      if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
    //          // set data to a new FormData object (from WebAPIs)
    //          let formData = new FormData();
    //          // use append method to create key/value pairs for the object
    //           formData = {
    //             "file": photo,
    //             "upload_preset" : "mm-game",
    //             "cloud_name" :"dcrwhj71h"
    //          }
    //         //  formData.append();
    //         //  formData.append("upload_preset", "mm-game");
    //         //  formData.append("cloud_name", "dcrwhj71h");
    //          // use fetch to send data to picture mgt. url through a post method
    //          const data = await axios
    //             .post("http://localhost:9991/user/upload-profile-picture", formData)
    //             .then((res) => console.log(res.data) )
    //         //  .then((formData) => {
    //         //      setPicture(formData.url.toString());
    //         //      setLoading(false);
    //         //  })
    //          .catch((err) => {
    //              console.log(err);
    //              setLoading(false);
    //          });
    //      }
    //      else {
    //          toast({
    //              title: 'Please select an image',
    //              status: 'warning',
    //              duration: 9000,
    //              isClosable: true,
    //              position: "bottom"
    //          });
    //          setLoading(false);
    //          return;
    //      }
    // } 
  
    //  const submitHandler = async () => {
    //      setLoading(true);
    //      if(!name || !email || !password || !confirmPassword) {
    //          toast({
    //              title: 'Please fill out all fields',
    //              status: 'warning',
    //              duration: 9000,
    //              isClosable: true,
    //              position: "bottom"
    //          });
    //      }
    //      if(password !== confirmPassword) {
    //          toast({
    //              title: 'Passwords do not match',
    //              status: 'warning',
    //              duration: 9000,
    //              isClosable: true,
    //              position: "bottom"
    //          });
    //      }
    //      try {
    //          const config = {
    //              headers: {
    //                  "Content-Type":"application/json  "
    //              },
    //          }
    //          const {data} = await axios.post(
    //              "/user", 
    //              {name, email, password, picture},
    //              config
    //          );
    //          toast({
    //              title: 'Registration Successful',
    //              status: 'success',
    //              duration: 9000,
    //              isClosable: true,
    //              position: "bottom"
    //          });
    //          sessionStorage.setItem("userInfo", JSON.stringify(data));
    //          setLoading(false);
    //          history.push('/home')
    //      }
    //      catch (error ){
    //          toast({
    //              title: 'Error Occured!',
    //              description: error.response.data,
    //              status: 'error',
    //              duration: 9000,
    //              isClosable: true,
    //              position: "bottom"
    //          });
    //          setLoading(false);
    //      }
        
  
     return (
         <VStack spacing="5px" color="black">
 
         <FormControl id="first-name" isRequired>
             <FormLabel>Name</FormLabel>
             <Input
             placeholder='Enter Your Name'
            //  onChange={(e)=>setName(e.target.value)} //Set name to whats entered in name field
             />
         </FormControl>
 
         
         <Button 
             colorScheme = "blue"
             width = "100%"
             style = {{marginTop: 15}}
            //  onClick = {(e) => postDetails(e.target.files[0])}
            //  isLoading = {loading}
         >
             Register
         </Button>
         </VStack>
     )
}

export default Register