import { createContext, useState } from 'react';

// Create the context
const RoomsContext = createContext();

// Create a provider component
const RoomsProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);

    return (
        <RoomsContext.Provider value={{ rooms, setRooms }}>
            {children}
        </RoomsContext.Provider>
    );
};

export { RoomsContext, RoomsProvider };