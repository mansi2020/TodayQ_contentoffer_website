import React, { createContext, useState, useContext } from "react";

const ContentContext = createContext();

export const useContentContext = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [contentData, setContentData] = useState([]);

  return (
    <ContentContext.Provider value={{ contentData, setContentData }}>
      {children}
    </ContentContext.Provider>
  );
};
