import React from "react";
import OwnedItem from "./OwnedItem";

const OwnedItems = ({ ownedItems }) => {
  return (
    <div>
      <hr />
      <div>
        {ownedItems?.map((ownedItem) => (
          <OwnedItem item={ownedItem} />
        ))}
      </div>
    </div>
  );
};

export default OwnedItems;
