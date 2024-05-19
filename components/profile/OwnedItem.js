import Image from "next/image";
import React from "react";

const OwnedItem = ({ item }) => {
  return (
    <div className="flex justify-start items-start m-2">
      <Image
        className="mr-2"
        src={item.photoUrl}
        alt={item.name}
        width={100}
        height={100}
      />
      <div>
        <div>
          <p className="text-slate-400 font-bold text-xs">Name</p>
          <p className="font-bold">{item.name}</p>
        </div>
        <div>
          <p className="text-slate-400 font-bold text-xs">Price</p>
          <p>${item.soldPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OwnedItem;
