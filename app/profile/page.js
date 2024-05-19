"use client";
import { getUserOwnedItems } from "@/api/user";
import OwnedItems from "@/components/profile/OwnedItems";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [ownedItems, setOwnedItems] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    getUserOwnedItems(session?.user?.name).then((response) => {
      setOwnedItems(response.data.items);
      console.log("Owned Items:", response.data);
    });
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-lg my-10">Owned Items</h2>
        <OwnedItems ownedItems={ownedItems} />
      </div>
    </div>
  );
};

export default Profile;
