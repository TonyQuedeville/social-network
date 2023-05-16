import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usernameOrEmail, setUsernameOrEmail] = useState("")

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, usernameOrEmail, setUsernameOrEmail }}>
            {children}
        </AuthContext.Provider>
    );
}