import { createContext, useState } from "react";

export const SiteContext = createContext({});

export const SiteContextProvider = ({ children }) => {
  const menuItemsMD = [
    { id: 1, name: "Home", link: "/" },
    { id: 1, name: "Stories", link: "/stories" },
    { id: 2, name: "About", link: "/about" },
    { id: 3, name: "Contact", link: "/contact" },
  ];
  const menuItemsLG = [
    { id: 3, name: "Home", link: "/" },
    { id: 1, name: "Login", link: "/" },
    { id: 1, name: "Your Stories", link: "/" },
    { id: 2, name: "FAQ", link: "/" },
    { id: 3, name: "Trending", link: "/" },
    { id: 3, name: "Popular", link: "/" },
  ];

  return (
    <SiteContext.Provider value={{ menuItemsMD, menuItemsLG }}>
      {children}
    </SiteContext.Provider>
  );
};
