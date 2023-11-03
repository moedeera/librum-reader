import { createContext, useState } from "react";
import { findImageSet, imagesSorted } from "../assets/images/images";
import { storiesInfo } from "./Content";

export const SiteContext = createContext({});

export const SiteContextProvider = ({ children }) => {
  const menuItemsMD = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Stories", link: "/stories" },
    { id: 3, name: "Write", link: "/write" },
    { id: 4, name: "Contact", link: "/contact" },
    { id: 5, name: "About", link: "/about" },
  ];
  const menuItemsLG = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Login", link: "/login" },
    { id: 3, name: "Your Stories", link: "/" },
    { id: 4, name: "Write", link: "/write" },
    { id: 5, name: "FAQ", link: "/" },
    { id: 6, name: "Contact", link: "/contact" },
    { id: 7, name: "Popular", link: "/" },
  ];

  const menuAlt = [
    { id: 1, name: "Terms of Use", link: "/" },
    { id: 2, name: "Privacy Policy", link: "/" },
    { id: 3, name: "Copyright Policy", link: "/" },
  ];
  function parseHTMLContent(html) {
    const container = document.createElement("div");
    container.innerHTML = html;

    const result = [];

    function traverse(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) {
          result.push({ tag: "p", type: "regular", content: text });
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        const type =
          node.tagName === "B"
            ? "bold"
            : node.tagName === "I"
            ? "italic"
            : "regular";
        const content = node.textContent.trim();

        result.push({ tag, type, content });
      }

      if (node.childNodes) {
        for (const child of node.childNodes) {
          traverse(child);
        }
      }
    }

    for (const element of container.childNodes) {
      traverse(element);
    }

    return result;
  }

  function parseHtmlToQuillDelta(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const quillDelta = [];

    const parseNode = (node) => {
      const insert = {};

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.replace(/\n/g, "\n"); // Replace newline characters
        if (text.trim()) {
          insert.insert = text;
          quillDelta.push(insert);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName;

        switch (tagName) {
          case "B":
          case "STRONG":
            insert.insert = node.textContent;
            insert.attributes = { bold: true };
            quillDelta.push(insert);
            break;
          case "I":
          case "EM":
            insert.insert = node.textContent;
            insert.attributes = { italic: true };
            quillDelta.push(insert);
            break;
          case "U":
            insert.insert = node.textContent;
            insert.attributes = { underline: true };
            quillDelta.push(insert);
            break;
          case "A":
            insert.insert = node.textContent;
            insert.attributes = { link: node.getAttribute("href") };
            quillDelta.push(insert);
            break;
          case "BR":
            insert.insert = "\n";
            quillDelta.push(insert);
            break;
          default:
            if (node.childNodes.length > 0) {
              const childNodes = node.childNodes;
              childNodes.forEach((childNode) => parseNode(childNode));
            }
            break;
        }
      }
    };

    doc.body.childNodes.forEach((node) => parseNode(node));

    return quillDelta;
  }

  // const htmlContent = "<b>Hello </b><strong>World!</strong><br>";
  // const quillDelta = parseHtmlToQuillDelta(htmlContent);
  // console.log(JSON.stringify(quillDelta, null, 2));

  return (
    <SiteContext.Provider
      value={{
        menuItemsMD,
        menuItemsLG,
        imagesSorted,
        findImageSet,
        menuAlt,
        parseHtmlToQuillDelta,
        storiesInfo,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
