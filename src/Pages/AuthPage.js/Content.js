const randomLiterature = [
  {
    category: "Fiction",
    title: "The Whispering Woods",
    tags: ["fantasy", "horror", "mystery"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2FThe%20Whispering%20Woods.webp?alt=media&token=96ee66b9-66c4-44b4-bb4e-df707a1c806f",
    promoted: false,
    stats: [0, 0, 0],
    story: [
      {
        attributes: {
          bold: true,
        },
        insert: "The Whispering Woods",
      },
      {
        attributes: {
          header: 3,
        },
        insert: "\n",
      },
      {
        insert:
          '"As twilight dawns, the air in Whispering Woods thickens with murmurs. Tales of a ghostly figure seen weaving between the trees have emerged. Locals whisper of an old hermit who once lived in the heart of the forest, known only as the Keeper of Secrets."',
      },
    ],
    synopsis:
      "Every night, the woods whisper and the shadows talk. Sarah and her friends enter the forest to uncover the truth behind the tales of the vanished hermit known as the Keeper of Secrets.",
    wordCount: 120,
  },
  {
    category: "Fiction",
    title: "The Clockmaker’s Secret",
    tags: ["steampunk", "mystery", "adventure"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2FTheClockmakersSecret.webp?alt=media&token=83ffe3cc-435d-413d-b73c-7ce2533dfd44",
    promoted: false,
    stats: [0, 0, 0],
    story: [
      {
        attributes: {
          bold: true,
        },
        insert: "The Clockmaker’s Secret",
      },
      {
        attributes: {
          header: 3,
        },
        insert: "\n",
      },
      {
        insert:
          '"In the bustling industrial heart of London, a renowned clockmaker vanishes, leaving behind a workshop filled with peculiar, intricate devices. His apprentice, Charlotte, finds a hidden compartment in his desk containing plans for an automaton with uncanny abilities."',
      },
    ],
    synopsis:
      "Charlotte, a talented young apprentice, unravels a mystery when her mentor disappears. Her discovery of an automaton plan leads her into a web of intrigue and revelations.",
    wordCount: 130,
  },
  {
    category: "Fiction",
    title: "Ghosts of the Sea",
    tags: ["adventure", "fantasy", "pirates"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2Fghostsofthesea.webp?alt=media&token=02192eae-5853-4dc9-bee1-69ad5c78af20",
    promoted: false,
    stats: [0, 0, 0],
    story: [
      {
        attributes: {
          bold: true,
        },
        insert: "Ghosts of the Sea",
      },
      {
        attributes: {
          header: 3,
        },
        insert: "\n",
      },
      {
        insert:
          '"Captain Eli and his crew of notorious pirates sail the haunted waters of the Marrow Sea. Legend says these waters are haunted by the Marrow Maiden, a ghostly figure seen on the darkest nights, guiding lost sailors or leading them to their doom."',
      },
    ],
    synopsis:
      "The notorious pirate Captain Eli searches for the legendary treasure of Marrow Sea, navigating not only treacherous waters but also the supernatural forces that guard it.",
    wordCount: 138,
  },
  {
    category: "Fiction",
    title: "The Last Lightkeeper",
    tags: ["drama", "mystery", "fantasy"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2FThe%20Last%20Lightkeeper.webp?alt=media&token=ff36487a-4b6d-4b60-ad91-f9c5dabab762",
    promoted: false,
    stats: [0, 0, 0],
    story: [
      {
        attributes: {
          bold: true,
        },
        insert: "The Last Lightkeeper",
      },
      {
        attributes: {
          header: 3,
        },
        insert: "\n",
      },
      {
        insert:
          '"In the remote village of Glimmer Shore, the old lighthouse stands deserted. Once a beacon for weary sailors, it now holds a secret. Nora, returning to her childhood home, discovers that the lightkeeper’s logs hint at a century-old mystery waiting to be solved."',
      },
    ],
    synopsis:
      "Nora, drawn back to her coastal hometown, becomes embroiled in uncovering the past of the abandoned lighthouse, where a lightkeeper's forgotten logs reveal a mysterious tale.",
    wordCount: 145,
  },

  {
    category: "Fiction",
    title: "Neon Dreams",
    tag: ["sci-fi", "urban", "future"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2Fneonedreams.webp?alt=media&token=e275a70d-cad7-42f8-a46f-02491a8b6d7f",
    promoted: false,
    stats: [0, 0, 0],
    story: [
      { attributes: { bold: true }, insert: "Neon Dreams" },
      { attributes: { header: 3 }, insert: "\n" },
      {
        insert:
          "In the city of tomorrow, bathed in neon lights and perpetual night, a young hacker named Ava uncovers a conspiracy that could alter the fabric of society.",
      },
    ],
    synopsis:
      "Ava, a skilled young hacker in a neon-soaked metropolis, navigates through digital espionage to uncover a truth that's been hidden right before everyone’s eyes.",
    wordCount: 100,
  },
  {
    category: "Fiction",
    title: "The Faerie Glade",
    tag: ["fantasy", "adventure", "mystical"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2Fneonedreams.webp?alt=media&token=e275a70d-cad7-42f8-a46f-02491a8b6d7f",
    promoted: false,
    stats: [0, 0, 0],
    story: [
      { attributes: { bold: true }, insert: "The Faerie Glade" },
      { attributes: { header: 3 }, insert: "\n" },
      {
        insert:
          "Deep in an ancient forest, Ellie discovers a hidden glade where faeries dance under the moonlight. Her arrival marks the first human steps there in centuries.",
      },
    ],
    synopsis:
      "Ellie stumbles upon a secret glade home to mystical creatures. As the first human to enter in ages, she becomes pivotal to the survival of magic itself.",
    wordCount: 115,
  },
  {
    category: "Fiction",
    title: "The Keeper of Secrets",
    tag: ["mystery", "historical", "thriller"],
    cover:
      "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2FkeeperofSecrets.webp?alt=media&token=d0b275b7-f598-477f-9b6f-9592ba8a975b",
    promoted: false,
    stats: [0, 0, 0],
    story: [
      { attributes: { bold: true }, insert: "The Keeper of Secrets" },
      { attributes: { header: 3 }, insert: "\n" },
      {
        insert:
          "Julian, a history student, stumbles upon a hidden passage in an ancient library that leads him to a forgotten chamber of books revealing earth-shaking secrets.",
      },
    ],
    synopsis:
      "In an ancient library, Julian uncovers a secret passage that leads to historical truths that could rewrite everything known about human history.",
    wordCount: 130,
  },
];
function getRandomItem(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("The provided input is not a valid array or it is empty.");
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
// const story = {
//   category: "Fiction",
//   title: "The Enigmatic Chronicles",
//   tags: ["fantasy", "mystery", "adventure"],
//   cover: "https://images.pexels.com/photos/1.jpg",
//   promoted: false,
//   stats: [0, 0, 0],
//   story: [
//     {
//       attributes: {
//         bold: true,
//       },
//       insert: "The Enigmatic chronicles",
//     },
//     {
//       attributes: {
//         header: 3,
//       },
//       insert: "\n",
//     },
//     {
//       insert:
//         '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
//     },
//   ],
//   synopsis:
//     "In a forgotten library, a curious librarian stumbles upon a book with blank pages. As she delves into its mystery, she finds herself transported to different realms, uncovering the enigmatic stories within the empty pages.",
//   wordCount: 150,
// };

export { randomLiterature, getRandomItem };
