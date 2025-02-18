import React, { createContext, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);              //storing user signup data
    const [personas,setPersonas] = useState([]);         //storing user persona data
    const addUser = (user) => {                           //adding signup by function
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    const checkUser = (email, password) => {                        // checking user email and password for login
        return users.some((user) => user.email === email && user.password === password);
    };

    const addPersona = (persona) =>{                       // addng persona data
        setPersonas((prevPersonas) => [...prevPersonas,persona]);
    }

    const editPersona = (index,newPersona) => {               //  passing edited persona data and index 
        setPersonas((prevPersona) => {                        //  picking old data by index and storing new persona data
            const oldPersonas = [...prevPersona];
            oldPersonas[index] = newPersona;
            return oldPersonas;
        })
    }

    const deletePersona = (persona) => {                     // After deleting we are storing the persona data
        setPersonas(persona);
    }

    return (
        <UserContext.Provider value={{ users, addUser, checkUser , personas , addPersona , editPersona , deletePersona}}>
            {children}
        </UserContext.Provider>
    );
};