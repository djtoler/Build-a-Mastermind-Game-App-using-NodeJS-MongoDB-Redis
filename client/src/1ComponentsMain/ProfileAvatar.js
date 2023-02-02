import React from "react";
import "./ProfileAvatarStyle.css";

const avatar = sessionStorage.getItem("avatar")
const ProfileAvatar = ({ src, alt }) => (
  <div className="ProfileAvatar">
    <img src={avatar} alt={alt} />
  </div>
);

export default ProfileAvatar;