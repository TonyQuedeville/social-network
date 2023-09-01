/*
	Projet Zone01 : Social network
	Tony Quedeville 
	28/08/2023
	Initialisation de Socket.io client pour tchat
    lien utile: https://socket.io/fr/how-to/use-with-react
*/

import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';

/* Par défaut, le client Socket.IO ouvre immédiatement une connexion au serveur. 
Vous pouvez empêcher ce comportement avec l' autoConnectoption : 
Dans ce cas, vous devrez appeler socket.connect() pour que le client Socket.IO se connecte. 
Cela peut être utile, par exemple, lorsque l'utilisateur doit fournir des informations d'identification 
avant de se connecter.
*/
export const socket = io(URL, { autoConnect: false });
// export const socket = io(URL);

