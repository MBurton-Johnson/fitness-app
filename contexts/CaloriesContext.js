"use client"

import { createContext, useContext, useState } from 'react';

const TotalCaloriesContext = createContext();

export const TotalCaloriesProvider = ({ children }) => {
  const [totalCalories, setTotalCalories] = useState(0);

  return (
    <TotalCaloriesContext.Provider value={{ totalCalories, setTotalCalories }}>
      {children}
    </TotalCaloriesContext.Provider>
  );
};

export const useTotalCalories = () => {
  const context = useContext(TotalCaloriesContext);
  if (!context) {
    throw new Error('useTotalCalories must be used within a TotalCaloriesProvider');
  }
  return context;
};
