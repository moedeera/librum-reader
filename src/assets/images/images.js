import librum1 from "./fantasy.jpg";
import librum2 from "./librum-r-3.jpg";
import librum3 from "./librum-r-1.jpg";
import library from "./library.jpg";
import fantasy2 from "./fantasy2.jpg";
import dystopia from "./dystopia1.jpg";
import eyeIcon from "./eye-icon.png";
import heartIcon from "./heart-icon.png";
import commentIcon from "./comment-icon.png";

const images = [librum1, librum2, librum3, library];
const imagesSorted = [
  { id: "all", images: images },
  {
    id: "librum-trending",
    images: [
      librum1,
      librum2,
      librum3,
      library,
      fantasy2,
      dystopia,
      librum1,
      librum2,
      librum3,
      library,
      fantasy2,
    ],
  },
  { id: "library", images: [library] },
  { id: "fantasy", images: [librum1, fantasy2] },
  { id: "icons", images: [eyeIcon, heartIcon, commentIcon] },
];

function findImageSet(ref, imagesSorted) {
  let match;
  const found = imagesSorted.some((img) => img.id === ref);

  if (found) {
    match = imagesSorted.find((img) => img.id === ref);

    return match.images;
  } else {
    return imagesSorted[0].images[0];
  }
}

export { imagesSorted as imagesSorted, findImageSet as findImageSet };
