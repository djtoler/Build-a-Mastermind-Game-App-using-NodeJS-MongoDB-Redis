import { Button } from "@chakra-ui/button";
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import {Input, InputGroup, InputRightElement} from '@chakra-ui/input';
import {VStack} from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import axios from "axios";


const Login = (props) => {
    // Set useState hooks for form fields
    const [file, setFile] = useState("");
    
    const [uploadedImg, setUploadedImg] = useState("");
    const [name, setName] = useState();


    const [image, setImage] = useState("");
    const [imageKey, setImageKey] = useState();
    const [imageCaption, setImageCaption] = useState();
    const [imageName, setImageName] = useState();


    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [picture, setPicture] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const config = { headers: { "Content-Type": "application/json" } };


    function previewFiles(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImage(reader.result);
          console.log(reader.result);
        };
        console.log(image);
      }
    
      const handleChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setFile(file);
        previewFiles(file);
      };

    const handleSubmit = async (e, req, res) => {
        e.preventDefault();
        const result = await axios.post(
        "http://localhost:9991/admin/upload-image-redis",
        {image: image, imageKey, imageName, imageCaption}, config
        ).then(async (result)=>{
            console.log('in then');
            console.log(result.data);
            setImageKey('')
            setImageCaption('')
            setImageName('')

            // let regResponseObject = result.data;
            // const validationResponse = () => {
            //     if (regResponseObject.errors) {
            //         console.log(regResponseObject.errors[0].msg);
            //         toast(regResponseObject.errors[regResponseObject.errors.length -1].msg)
            //     } else {
            //         toast(regResponseObject.msg)
            //     }
            // } 
            // validationResponse()
            // sessionStorage.setItem("sessionData", JSON.stringify(regResponseObject));
            // sessionStorage.setItem("email", regResponseObject.email)
            // let useremail = sessionStorage.getItem("email")
            // console.log(useremail);
            // console.log(result.data.email)
            // setLoading(false);
            // console.log('hello');
            // // history.push("/home");
            // try {
            //     const uploadedImg = result.data.picture;
            //     setUploadedImg(uploadedImg);
            //     const uploadedEmail = result.data.email;
            //     setUploadedEmail(uploadedEmail)
            //     console.log(uploadedEmail);

            // } catch (error) {
            //     setLoading(false);
            // }
        })
    }

    return (
        <VStack spacing="5px" color="black">

            <FormControl id="imageKeyLog" isRequired>
                <FormLabel>Image Key</FormLabel>
                <Input placeholder="Enter Your Image Key" value={imageKey} onChange={(e) => setImageKey(e.target.value)}/>
            </FormControl>

            <FormControl id="imageNameLog" isRequired>
                <FormLabel>Image Name</FormLabel>
                <Input placeholder="Enter Your Image Name" value={imageName} onChange={(e) => setImageName(e.target.value)}/>
            </FormControl>

            <FormControl id="imageCaptionLog" isRequired>
                <FormLabel>Image Caption</FormLabel>
                <Input placeholder="Enter Your Caption" value={imageCaption} onChange={(e) => setImageCaption(e.target.value)}/>
            </FormControl>

            {/* <label htmlFor="fileInput">Upload your photo here</label> */}
            
            <form onSubmit={(e) => handleSubmit(e)}>
                <Button 
                    colorScheme = "blue"
                    width = "100%"
                    style = {{marginTop: 15}}
                    isLoading = {loading}
                >
                    <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => handleChange(e)}
                    required
                    accept="image/png, image/jpeg, image.jpg, image/jfif"
                    />
                </Button>
            </form>
                <Button 
                    colorScheme = "blue"
                    width = "100%"
                    style = {{marginTop: 15}}
                    onClick = {handleSubmit}
                    isLoading = {loading}
                >
                    Upload Photo
                </Button>

        </VStack>
    );
}
export default Login