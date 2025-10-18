import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const [selectedRegion, setSelectedRegion] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  return <AppContext.Provider value={{ darkMode, toggleDarkMode, searchTerm, setSearchTerm, selectedRegion, setSelectedRegion }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
