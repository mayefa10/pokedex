/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, type ReactNode } from "react";

// Estado inicial
type FilterState = {
  searchTerm: string;
  selectedType: string;
  sortBy: 'name' | 'id';
};

const initialState: FilterState = {
  searchTerm: '',
  selectedType: 'all',
  sortBy: 'name',
};

// Actions
type Action =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_SELECTED_TYPE"; payload: string }
  | { type: "SET_SORT_BY"; payload: 'name' | 'id' }
  | { type: "CLEAR_FILTERS" };

function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_SELECTED_TYPE":
      return { ...state, selectedType: action.payload };
    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload };
    case "CLEAR_FILTERS":
      return { ...initialState };
    default:
      return state;
  }
}

// Context type
interface FilterContextType extends FilterState {
  setSearchTerm: (term: string) => void;
  setSelectedType: (type: string) => void;
  setSortBy: (sort: 'name' | 'id') => void;
  clearFilters: () => void;
}

// Creamos contexto
export const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setSearchTerm = (term: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: term });
  };

  const setSelectedType = (type: string) => {
    dispatch({ type: "SET_SELECTED_TYPE", payload: type });
  };

  const setSortBy = (sort: 'name' | 'id') => {
    dispatch({ type: "SET_SORT_BY", payload: sort });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  return (
    <FilterContext.Provider
      value={{
        searchTerm: state.searchTerm,
        selectedType: state.selectedType,
        sortBy: state.sortBy,
        setSearchTerm,
        setSelectedType,
        setSortBy,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};