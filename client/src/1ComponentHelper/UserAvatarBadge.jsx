import React, { useState } from "react";
import { Badge } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

const UserAvatarBadge = ({ uploadedImg }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("userInfo")));
  const [userEmail, setUserEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.name);
  const cld = new Cloudinary( {cloud: {cloudName: "dcrwhj71h"} });
  const myImage = cld.image(uploadedImg);
  myImage
    .resize(thumbnail().width(100).height(100).gravity(focusOn(FocusOn.face())))
    .roundCorners(byRadius(100));
  return (
    <>
    <AdvancedImage cldImg={myImage} />
      <Flex>
        <Box borderRadius='md' bg='#C1FFD5' color='black' px={100} h={50}>
        </Box>
      </Flex>
    </>
  );
};

export default UserAvatarBadge;