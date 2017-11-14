/**
 * Create a list of coupled shuffled cards given the images
 */
export const createRandomList = (images) => {
  const size = 2 * images.cardFrontImages.length;

  let array = createRandomArray(size);
  let availableImages = images.cardFrontImages.slice();

  const cards = new Array(size);
  for (let i = 0; i < array.length; i += 2) {
    const image = availableImages.pop();

    cards[array[i]] = {
      id: array[i],
      front: image,
      back: images.cardBackImage
    };

    cards[array[i + 1]] = {
      id: array[i + 1],
      front: image,
      back: images.cardBackImage
    };
  }

  return cards;
}

/**
 * Create an array with integer from 0 to size - 1 shuffled
 */
function createRandomArray(size) {
  let array = Array.from(Array(size).keys());
  return shuffle(array);
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