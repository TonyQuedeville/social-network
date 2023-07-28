/*
	Projet Zone01 : Social network
	Tony Quedeville 
	27/07/2023
	Redux Reducers : Les reducers sont des fonctions qui spécifient comment l'état global du store 
    est modifié en réponse à une action. Ils prennent l'état actuel et une action en entrée, 
    et retournent un nouvel état modifié.
*/

const initialState = {
  groupId: '',
  title: '',
  createDate: '',
  description: '',
  image: '',
  admin: '',
  nbMembers: null, 
  members: [],
  wait_members: [],
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GROUP_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
  