/*
	Projet Zone01 : Social network
	Tony Quedeville 
	27/07/2023
	Redux Reducers : Les reducers sont des fonctions qui spécifient comment l'état global du store 
    est modifié en réponse à une action. Ils prennent l'état actuel et une action en entrée, 
    et retournent un nouvel état modifié.
*/

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialValues = {
  isAuthenticated: false,
  isConnected: false,
  email: '',
  pseudo: '',
  id: 0,
  sexe: 'h',
  lastname: '',
  firstname: '',
  born_date: '',
  about: '',
  image: '',
  statusProfil: 'private',
  follower: [],
  waitFollowers: [],
  followed: [],
  groups_members: [],
  wait_groups_members: [],
  waitGroupsAccept: [],
  invit_groups: [],
  events: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialValues,
  reducers: {
    updateUserData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },

    setWaitFollowers: (state, action) => {
      state.waitFollowers = action.payload
    },

    setWaitGroupsAccept: (state, action) => {
      state.waitGroupsAccept = action.payload
    },

    setEvents: (state, action) => {
      state.events = action.payload
    },

    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },


    handleLogout:() => {
      Cookies.remove('session')
      return initialValues;
    }
  },
})

export const { 
  updateUserData, 
  setWaitFollowers, 
  setWaitGroupsAccept, 
  setEvents, 
  setIsAuthenticated,
  handleLogout 
} = userSlice.actions

export default userSlice.reducer