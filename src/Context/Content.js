const info = [
  {
    id: 1,
    cat: "Fiction",
    title: "The Enigmatic Chronicles",
    info: "In a forgotten library, a curious librarian stumbles upon a book with blank pages. As she delves into its mystery, she finds herself transported to different realms, uncovering the enigmatic stories within the empty pages.",
    link: "/enigmatic-chronicles",
    tag: ["fantasy", "mystery", "adventure"],
    pic: "https://images.pexels.com/photos/1.jpg",
  },

  {
    id: 2,
    cat: "Non-fiction",
    title: "Journey to the Abyss",
    info: "A marine biologist recounts her deep-sea expedition to explore the mysteries of the ocean's abyss. From undiscovered creatures to ancient shipwrecks, her journey unveils the secrets hidden in the depths of the unexplored ocean.",
    link: "/journey-to-abyss",
    tag: ["science", "exploration", "marine biology"],
    pic: "https://images.pexels.com/photos/2.jpg",
  },
  {
    id: 3,
    cat: "Fiction",
    title: "Echoes of Eternity",
    info: "In a dystopian future, a musician discovers a forbidden instrument that echoes the emotions of the past. As he plays, the melodies unravel a hidden truth about the society's oppressive regime and ignite a rebellion fueled by music.",
    link: "/echoes-of-eternity",
    tag: ["dystopia", "music", "rebellion"],
    pic: "https://images.pexels.com/photos/3.jpg",
  },
  {
    id: 4,
    cat: "Non-fiction",
    title: "The Quantum Mind",
    info: "A physicist explores the frontiers of quantum consciousness, delving into the intriguing intersection of quantum physics and the human mind. Can the principles of quantum mechanics explain the mysteries of consciousness?",
    link: "/quantum-mind",
    tag: ["science", "quantum physics", "consciousness"],
    pic: "https://images.pexels.com/photos/4.jpg",
  },
  {
    id: 5,
    cat: "Fiction",
    title: "Whispers in the Wind",
    info: "A small town grapples with a series of inexplicable events as whispers in the wind foretell the future. The townspeople must decipher these cryptic messages to prevent an impending disaster that looms on the horizon.",
    link: "/whispers-in-the-wind",
    tag: ["mystery", "supernatural", "small town"],
    pic: "https://images.pexels.com/photos/5.jpg",
  },
  {
    id: 6,
    cat: "Non-fiction",
    title: "The Art of Innovation",
    info: "A business mogul reflects on the journey of creating groundbreaking innovations. From the initial spark of an idea to navigating challenges, this narrative provides insights into the art and science of fostering creativity.",
    link: "/art-of-innovation",
    tag: ["business", "innovation", "creativity"],
    pic: "https://images.pexels.com/photos/6.jpg",
  },
  {
    id: 7,
    cat: "Fiction",
    title: "Serenade of Shadows",
    info: "In a world where shadows come to life, a young artist discovers her ability to manipulate shadows through her paintings. As she explores this newfound power, she unravels a hidden dimension and faces ancient shadows with a dark agenda.",
    link: "/serenade-of-shadows",
    tag: ["fantasy", "magic", "adventure"],
    pic: "https://images.pexels.com/photos/7.jpg",
  },
  {
    id: 8,
    cat: "Non-fiction",
    title: "Exploring Time Travel Theories",
    info: "A physicist embarks on a journey through the theories of time travel, from Einstein's relativity to quantum time dilation. This exploration delves into the scientific and philosophical implications of bending the fabric of time.",
    link: "/time-travel-theories",
    tag: ["science", "time travel", "physics"],
    pic: "https://images.pexels.com/photos/8.jpg",
  },
  {
    id: 9,
    cat: "Fiction",
    title: "The Clockwork Conundrum",
    info: "In a steampunk city powered by gears and cogs, a detective unravels a series of mysterious clockwork crimes. As he follows the winding trails of gears, he discovers a secret society orchestrating a grand mechanical conspiracy.",
    link: "/clockwork-conundrum",
    tag: ["steampunk", "mystery", "detective"],
    pic: "https://images.pexels.com/photos/9.jpg",
  },
  {
    id: 10,
    cat: "Non-fiction",
    title: "Voices from the Stars",
    info: "Astronomers recount their experiences in deciphering signals from distant galaxies. These cosmic messages, once decoded, reveal the voices of civilizations far beyond our own, sparking reflections on the vastness of the universe.",
    link: "/voices-from-the-stars",
    tag: ["astronomy", "space", "extraterrestrial"],
    pic: "https://images.pexels.com/photos/10.jpg",
  },
];

const loremIpsum = [
  {
    attributes: {
      bold: true,
    },
    insert: "The standard Lorem Ipsum passage, used since the 1500s",
  },
  {
    attributes: {
      header: 3,
    },
    insert: "\n",
  },
  {
    insert:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
  },
  {
    attributes: {
      align: "justify",
    },
    insert: "\n",
  },
  {
    attributes: {
      bold: true,
    },
    insert:
      'Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
  },
  {
    attributes: {
      header: 3,
    },
    insert: "\n",
  },
  {
    insert:
      '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"',
  },
  {
    attributes: {
      align: "justify",
    },
    insert: "\n",
  },
  {
    attributes: {
      bold: true,
    },
    insert: "1914 translation by H. Rackham",
  },
  {
    attributes: {
      header: 3,
    },
    insert: "\n",
  },
  {
    insert:
      '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"',
  },
  {
    attributes: {
      align: "justify",
    },
    insert: "\n",
  },
  {
    insert: "\n",
  },
];

const block3Content = {
  title: "Where the power of words and the art of storytelling converge",
  text: `
 Librum Reader is not just a website; it's a literary haven that emphasizes the profound significance of reading, reviewing, and editing short stories. In a world brimming with narratives, we believe that each short story is a gem waiting to be discovered and polished. Our platform is dedicated to fostering a community of passionate readers, thoughtful reviewers, and meticulous editors who recognize the transformative potential of concise tales. Whether you're an avid reader seeking captivating narratives, an aspiring writer yearning for constructive feedback, or an editor with a keen eye for perfection, Librum Reader provides the space and tools for literary enthusiasts to connect, explore, and refine the art of short storytelling. Join us in celebrating the written word and let Librum Reader be your companion on a journey through the boundless realms of imagination.`,
  button: { link: "/", text: "More" },
};

export {
  info as storiesInfo,
  block3Content as b3content,
  loremIpsum as loremIpsum,
};
