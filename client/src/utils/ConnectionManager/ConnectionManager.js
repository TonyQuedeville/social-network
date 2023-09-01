/*
	Projet Zone01 : Social network
	Tony Quedeville 
	28/08/2023
	Connection et Deconnection de Socket.io client pour tchat. 
    Pour test et debuguage uniquement
    lien utile: https://socket.io/fr/how-to/use-with-react
*/


import React from 'react';
import { socket } from '../../socket';

export function ConnectionManager() {
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    return (
        <>
        <button onClick={ connect }>Connect</button>
        <button onClick={ disconnect }>Disconnect</button>
        </>
    );
}