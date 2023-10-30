import librum1 from "./librum-r-1.jpg";
import librum2 from "./librum-r-3.jpg";
import librum3 from "./librum-r-2.jpg";

const images = [librum1, librum2, librum3];
const imagesSorted = [
  { id: "all", images: images },
  { id: "librum-trending", images: [librum1, librum2, librum3] },
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
