import React from 'react';
import { Badge } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

const ProfileBadge = ({uploadedImg}) => {
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dcrwhj71h'
        }
      }); 
      const myImage = cld.image(uploadedImg);
      console.log(myImage);
      myImage.resize(thumbnail().width(100).height(100).gravity(focusOn(FocusOn.face()))).roundCorners(byRadius(100))
    return (
        <>
        
        <Flex>
        <Box ml='3'>
            <Avatar cldImg={myImage} />
            <Text fontWeight='bold'>  Billy User </Text>
          </Box>
        </Flex>
        </>
    )
}

export default ProfileBadge;