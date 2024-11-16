import React from "react";

interface IProfileLayoutProps {
  children?: React.ReactNode;
}

const ProfileLayout = ({ children }: IProfileLayoutProps) => {
  return <div className="p-3">{children}</div>;
};

export default ProfileLayout;
