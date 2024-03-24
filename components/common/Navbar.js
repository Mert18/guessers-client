import React from "react";
import AuthStatus from "../authStatus";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between p-2 items-center border border-b-red-400">
        <div>
            <Link className="mr-2" href="/main">Home</Link>
            <Link href="/profile">Profile</Link>
        </div>
      <AuthStatus />
    </div>
  );
};

export default Navbar;
