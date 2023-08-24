/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Point d'entrée de l'application Client : localhost:3000
*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // https://tanstack.com/query/latest/docs/react/overview
import store from './redux/store';
import App from './App'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App/>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

