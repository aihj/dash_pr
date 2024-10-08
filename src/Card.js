import React from "react";

const Card = ({children}) => {
    return(
        <div className="w-full h-full rounded-md relative p-4 border-2 bg-zinc-50">
            {children}
        </div>
    );
};

export default Card;