/**
 * Create a list of coupled shuffled cards given the images
 */
export const createRandomList = (images) => {
  const size = 2 * images.cardFrontImages.length;
  let availableImages = images.cardFrontImages.slice();

  const cards = [];
  for (let i = 0; i < size; i += 2) {
    const image = availableImages.pop();

    cards.push({
      id: i,
      front: image,
      back: images.cardBackImage
    }, {
      id: i + 1,
      front: image,
      back: images.cardBackImage
    });
  }

  return shuffle(cards);
}

/**
 * Create a new shuffled array from a given array
 */
function shuffle(array) {
  let a = array.slice();
  let x, i, j;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
