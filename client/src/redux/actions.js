/*
	Projet Zone01 : Social network
	Tony Quedeville 
	27/07/2023
	Redux Actions : Les actions sont des objets qui décrivent ce qui se passe dans votre application. 
    Elles sont déclenchées par des événements (par exemple, un clic sur un bouton) et sont utilisées 
    pour mettre à jour le store.
*/

export const updateGroupData = (data) => {
  return {
    type: 'UPDATE_GROUP_DATA',
    payload: data,
  };
};


