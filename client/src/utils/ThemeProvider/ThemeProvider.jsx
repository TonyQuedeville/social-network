// src/utils/context

import React, { useState, createContext } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    //console.log("ThemeProvider !");
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
