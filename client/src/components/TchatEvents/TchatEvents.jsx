/*
	Projet Zone01 : Social network
	Tony Quedeville 
	28/08/2023
	Evènements du tchat Socket.io 
    lien utile: https://socket.io/fr/how-to/use-with-react
*/

import React from 'react';

const TchatEvents = ({ events }) => {
    return (
        <ul>
        { events.map((event, index) =>
            <li key={ index }>{ event }</li>
        )}
        </ul>
    );
}

export default TchatEvents