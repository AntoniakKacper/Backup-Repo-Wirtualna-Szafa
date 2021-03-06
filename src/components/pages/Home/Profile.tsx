import React from "react";
import AvatarEditor from "react-avatar-editor";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
  return (
    <AvatarEditor
      image="http://example.com/initialimage.jpg"
      width={250}
      height={250}
      border={50}
      color={[255, 255, 255, 0.6]} // RGBA
      scale={1.2}
      rotate={0}
    />
  );
};
