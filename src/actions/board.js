import * as types from "../types";

export const initBoard = () => ({
  type: types.INIT_BOARD
});

export const incrementMove = () => ({
  type: types.INCREMENT_MOVE
});

export const checkFlippedCard = cardId => ({
  type: types.CHECK_FLIPPED_CARD,
  cardId
});

export const flipCard = cardId => ({
  type: types.FLIP_CARD,
  cardId
});

export const flipCardTimeout = cardId => ({
  type: types.FLIP_CARD_TIMEOUT,
  cardId: cardId
});

export const checkMatch = () => ({
  type: types.CHECK_MATCH
});

export const checkBoard = () => ({
  type: types.CHECK_BOARD
});
