import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [value9, setValue9] = useState('');

  return (
    <AppContext.Provider value={{ value9, setValue9 }}>
      {children}
    </AppContext.Provider>
  );
};
