/*
	Projet Zone01 : Social network
	Tony Quedeville 
	27/07/2023
	Redux Store : Le store est l'objet central de Redux qui contient l'état global de votre application. 
    C'est un objet immuable qui ne peut être modifié que par des fonctions spécifiques appelées "reducers".
*/

// redux/store.js
// yarn add @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers';

// Créez le store en utilisant le rootReducer et l'état initial 
const store = configureStore({
	reducer: {
	  user: userReducer, // La clé 'user' correspond à la clé que utilisée dans les composants
	},
});


export default store; 
