import React, { createContext, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [personas,setPersonas] = useState([]);
    const addUser = (user) => {
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    const checkUser = (email, password) => {
        return users.some((user) => user.email === email && user.password === password);
    };

    const addPersona = (persona) =>{
        setPersonas((prevPersonas) => [...prevPersonas,persona]);
    }

    const editPersona = (index,newPersona) => {
        setPersonas((prevPersona) => {
            const oldPersonas = [...prevPersona];
            oldPersonas[index] = newPersona;
            return oldPersonas;
        })
    }

    return (
        <UserContext.Provider value={{ users, addUser, checkUser , personas , addPersona , editPersona}}>
            {children}
        </UserContext.Provider>
    );
};