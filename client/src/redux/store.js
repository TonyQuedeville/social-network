/*
	Projet Zone01 : Social network
	Tony Quedeville 
	27/07/2023
	Redux Store : Le store est l'objet central de Redux qui contient l'état global de votre application. 
    C'est un objet immuable qui ne peut être modifié que par des fonctions spécifiques appelées "reducers".
*/

// redux/store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Importez votre rootReducer ici

const store = createStore(rootReducer); // Créez le store en utilisant le rootReducer et l'état initial

export default store; // Exportez le store par défaut
