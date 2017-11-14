import { createRandomList } from './cardsUtil';

const images = {
  cardFrontImages: ['img1', 'img2', 'img3', 'img4', 'img5', 'img6'],
  cardBackImage: 'backofcard'
};

describe('Board actions tests', () => {
  it('Should return a cards configuration with every image repeated twice', () => {
    const cards = createRandomList(images);

    expect(cards).toHaveLength(12);
    expect(cards.filter(c => c.front === 'img1')).toHaveLength(2);
    expect(cards.filter(c => c.front === 'img2')).toHaveLength(2);
    expect(cards.filter(c => c.front === 'img3')).toHaveLength(2);
    expect(cards.filter(c => c.front === 'img4')).toHaveLength(2);
    expect(cards.filter(c => c.front === 'img5')).toHaveLength(2);
    expect(cards.filter(c => c.front === 'img6')).toHaveLength(2);
  });

  it('Should return a different cards configuration every time', () => {

    const cardsConfig1 = createRandomList(images);
    const cardsConfig2 = createRandomList(images);

    expect(cardsConfig1).not.toEqual(cardsConfig2);
  });
});