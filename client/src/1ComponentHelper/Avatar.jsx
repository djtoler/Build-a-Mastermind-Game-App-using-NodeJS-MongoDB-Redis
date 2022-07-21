import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

const Avatar = ({uploadedImg}) => {
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dcrwhj71h'
        }
      }); 
      const myImage = cld.image(uploadedImg);
      myImage.resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face()))).roundCorners(byRadius(100))
    return (
        <>
          <AdvancedImage cldImg={myImage}/>
        </>
    )
}

export default Avatar;