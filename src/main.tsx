import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react';
import { client } from './apollo/client.ts';
import './index.css'
import App from './App.tsx'
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { FilterProvider } from './context/FilterContext.tsx';


createRoot(document.getElementById('root')!).render(
   <StrictMode>
     <ApolloProvider client={client}>
      <FavoritesProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </FavoritesProvider>
    </ApolloProvider>
  </StrictMode>,
)
