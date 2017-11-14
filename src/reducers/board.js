import * as types from '../types';
import images from '../assets/images';
import { createRandomList } from '../utils/cardsUtil';

const initState = {
  moves: 0,
  win: false,
  flipTimeout: 5000,
  rows: 3,
  columns: 4,
  cards: []
};

export default function board(state = initState, action = {}) {
  switch (action.type) {
    case types.INIT_BOARD:
      return initBoard(state)
    case types.INCREMENT_MOVE:
      return incrementMove(state);
    case types.CHECK_FLIPPED_CARD:
      return checkFlippedCard(state, action);
    case types.FLIP_CARD:
      return flipCard(state, action);
    case types.FLIP_CARD_TIMEOUT:
      return flipCardTimeout(state, action);
    case types.CHECK_MATCH:
      return checkMatch(state);
    case types.CHECK_BOARD:
      return checkBoard(state);
    default:
      return state;
  }
}

function initBoard(state) {
  return {
    ...state,
    win: false,
    moves: 0,
    cards: createRandomList(images)
  };
}

function incrementMove(state) {
  return { ...state, moves: state.moves + 1 };
}

function checkFlippedCard(state, action) {
  const flippedCards = state.cards
    .filter(card => card.flipped && !card.matched && card.id !== action.cardId);

  if (flippedCards && flippedCards.length === 2) {
    const cards = state.cards.map(card => {
      if (flippedCards.includes(card)) {
        return { ...card, flipped: !card.flipped };
      }
      return card;
    });

    return { ...state, cards };
  }

  return state;
}

function flipCard(state, action) {
  const cards = state.cards.map(card => {
    if (card.id === action.cardId) {
      return { ...card, flipped: !card.flipped };
    }
    return card;
  });

  return { ...state, cards };
}

function flipCardTimeout(state, action) {
  const flippedCard = state.cards
    .find(card => card.id === action.cardId && card.flipped && !card.matched);

  if (flippedCard) {
    const cards = state.cards.map(card => {
      if (flippedCard === card) {
        return { ...card, flipped: false };
      }
      return card;
    });

    return { ...state, cards };
  }

  return state;
}

function checkMatch(state) {
  const flippedCards = state.cards.filter(card => card.flipped && !card.matched);

  if (flippedCards && flippedCards.length === 2
    && flippedCards[0].front === flippedCards[1].front) {

    const cards = state.cards.map(card => {
      if (flippedCards.includes(card)) {
        return { ...card, matched: true };
      }
      return card;
    });

    return { ...state, cards };
  }

  return state;
}

function checkBoard(state) {
  const cardsLeft = state.cards.filter(card => !card.matched).length;
  return { ...state, win: cardsLeft === 0 };
}