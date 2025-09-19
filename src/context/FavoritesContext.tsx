/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, type ReactNode } from "react";

// Estado inicial
type FavoritesState = {
  favorites: number[];
};

const initialState: FavoritesState = {
  favorites: [],
};

// Actions
type Action =
  | { type: "TOGGLE_FAVORITE"; payload: number };

function favoritesReducer(state: FavoritesState, action: Action): FavoritesState {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return state.favorites.includes(action.payload)
        ? { favorites: state.favorites.filter((id) => id !== action.payload) }
        : { favorites: [...state.favorites, action.payload] };
    default:
      return state;
  }
}

// Context type
interface FavoritesContextType extends FavoritesState {
  toggleFavorite: (id: number) => void;
}

// Creamos contexto
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const toggleFavorite = (id: number) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };

  return (
    <FavoritesContext.Provider value={{ favorites: state.favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
