/*
	Projet Zone01 : Social network
	Tony Quedeville 
	28/08/2023
	Etat de connection de Socket.io client pour tchat.
	Pour test et debuguage uniquement.
    lien utile: https://socket.io/fr/how-to/use-with-react
*/

import React from 'react'

export function ConnectionState({ isConnected }) {
    return <p>Tchat connexion: { '' + isConnected }</p>
}