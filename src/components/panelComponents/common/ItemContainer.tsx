import React from "react";

interface ItemContainerProps {
  children: React.ReactNode;
}

const ItemContainer: React.FC<ItemContainerProps> = ({ children }) => {
  return (
    <div className="w-5/6 flex flex-col gap-8 px-4 py-4 border border-gray-200 rounded-lg bg-white shadow-sm mx-auto __className_a182b8 ">
      {children}
    </div>
  );
};

export default ItemContainer;
