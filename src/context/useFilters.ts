import { useContext } from "react";
import { FilterContext } from "./FilterContext";

export const useFilters = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }

  return context;
};