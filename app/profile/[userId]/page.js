import { useSession } from "next-auth/react";
import React from "react";

const User = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Sesssion: ", session?.user);
  }, [session]);
  return <div></div>;
};
export default User;
