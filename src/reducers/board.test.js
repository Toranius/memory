import * as types from '../types';
import board from './board';
import * as cardsUtils from '../utils/cardsUtil';

let cards = [];

beforeEach(() => {
  cards = [
    { id: 1, front: 'img1' },
    { id: 2, front: 'img4' },
    { id: 3, front: 'img2' },
    { id: 4, front: 'img4', flipped: false },
    { id: 5, front: 'img6', flipped: true, matched: true },
    { id: 6, front: 'img2', flipped: false },
    { id: 7, front: 'img3' },
    { id: 8, front: 'img3' },
    { id: 9, front: 'img1' },
    { id: 10, front: 'img5' },
    { id: 11, front: 'img6', flipped: true, matched: true },
    { id: 12, front: 'img5' }
  ]
})

describe('Board reducer tests', () => {
  it('Should initialize the board', () => {
    cardsUtils.createRandomList = jest.fn();
    cardsUtils.createRandomList.mockReturnValueOnce(cards);
    const state = {
      moves: 0,
      win: false,
      flipTimeout: 5000,
      rows: 3,
      columns: 4,
      cards: []
    };

    const newState = board(state, { type: types.INIT_BOARD });

    expect(cardsUtils.createRandomList).toHaveBeenCalled();
    expect(newState.cards).toEqual(cards);
  });

  it('Should increment move by 1', () => {
    const state = { moves: 1 };

    const newState = board(state, { type: types.INCREMENT_MOVE });

    expect(newState.moves).toEqual(2);
  });

  it('Should flip card if no one card', () => {
    const state = { cards };

    const newState = board(state, { type: types.FLIP_CARD, cardId: 1 });

    expect(newState.cards.filter(c => c.id === 1 && c.flipped))
      .toHaveLength(1);
    expect(newState.cards.filter(c => c.id !== 1))
      .toEqual(state.cards.filter(c => c.id !== 1));
  });

  it('Should cover two flipped not matched card if another card is going to flip ', () => {
    cards.find(c => c.id === 1).flipped = true;
    cards.find(c => c.id === 2).flipped = true;
    const state = { cards };

    const newState = board(state, { type: types.CHECK_FLIPPED_CARD, cardId: 3 });

    expect(newState.cards.filter(c => [1, 2].includes(c.id) && !c.flipped && !c.matched))
      .toHaveLength(2);
    expect(newState.cards.filter(c => c.id === 3 && !c.flipped))
      .toHaveLength(1);
    expect(newState.cards.filter(c => ![1, 2, 3].includes(c.id)))
      .toEqual(state.cards.filter(c => ![1, 2, 3].includes(c.id)));

  });

  it('Should match two flipped not matched cards with same image', () => {
    cards.find(c => c.id === 1).flipped = true;
    cards.find(c => c.id === 9).flipped = true;
    const state = { cards };

    const newState = board(state, { type: types.CHECK_MATCH });

    expect(newState.cards.filter(c => c.front === 'img1' && c.flipped && c.matched))
      .toHaveLength(2);
    expect(newState.cards.filter(c => c.front !== 'img1'))
      .toEqual(state.cards.filter(c => c.front !== 'img1'))
  });

  it('Should cover a flipped card after timeout if not matched yet', () => {
    cards.find(c => c.id === 1).flipped = true;
    const state = { cards };

    const newState = board(state, { type: types.FLIP_CARD_TIMEOUT, cardId: 1 });

    expect(newState.cards.filter(c => c.id === 1 && !c.flipped))
      .toHaveLength(1);
    expect(newState.cards.filter(c => c.id !== 1))
      .toEqual(state.cards.filter(c => c.id !== 1))
  });

  it('Should check win if there are cards not matched', () => {
    const state = { win: false, cards };

    const newState = board(state, { type: types.CHECK_BOARD });

    expect(newState.win).toBeFalsy();
  });

  it('Should check win all cards are matched', () => {
    cards = cards.map(c => ({ ...c, flipped: true, matched: true }));
    const state = { win: false, cards };

    const newState = board(state, { type: types.CHECK_BOARD });

    expect(newState.win).toBeTruthy();
  });
})