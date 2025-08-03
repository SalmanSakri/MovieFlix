import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [previousRoute, setPreviousRoute] = useState(null);

  return (
    <SearchContext.Provider value={{ query, setQuery, previousRoute, setPreviousRoute }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
