import { createContext, useState } from "react";

export const SiteContext = createContext({});

export const SiteContextProvider = ({ children }) => {
  const menuItemsMD = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Stories", link: "/stories" },
    { id: 3, name: "Write", link: "/about" },
    { id: 4, name: "Trending", link: "/contact" },
    { id: 5, name: "About", link: "/about" },
  ];
  const menuItemsLG = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Login", link: "/" },
    { id: 3, name: "Your Stories", link: "/" },
    { id: 4, name: "FAQ", link: "/" },
    { id: 5, name: "Trending", link: "/" },
    { id: 6, name: "Popular", link: "/" },
  ];

  return (
    <SiteContext.Provider value={{ menuItemsMD, menuItemsLG }}>
      {children}
    </SiteContext.Provider>
  );
};
