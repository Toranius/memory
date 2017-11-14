import * as types from '../types';
import * as boardActions from "../actions/board";

describe('Board actions tests', () => {

  it('Should trigger init board reducer', () => {
    const action = boardActions.initBoard();
    expect(action.type).toEqual(types.INIT_BOARD);
  });

  it('Should trigger increment move reducer', () => {
    const action = boardActions.incrementMove();
    expect(action.type).toEqual(types.INCREMENT_MOVE);
  });

  it('Should trigger check flipped card reducer', () => {
    const action = boardActions.checkFlippedCard(1);
    expect(action.type).toEqual(types.CHECK_FLIPPED_CARD);
    expect(action.cardId).toEqual(1);
  });

  it('Should trigger flip card reducer', () => {
    const action = boardActions.flipCard(1);
    expect(action.type).toEqual(types.FLIP_CARD);
    expect(action.cardId).toEqual(1);
  });

  it('Should trigger flip card timeout reducer', () => {
    const action = boardActions.flipCardTimeout(1);
    expect(action.type).toEqual(types.FLIP_CARD_TIMEOUT);
    expect(action.cardId).toEqual(1);
  });

  it('Should trigger check match reducer', () => {
    const action = boardActions.checkMatch();
    expect(action.type).toEqual(types.CHECK_MATCH);
  });

  it('Should trigger check board reducer', () => {
    const action = boardActions.checkBoard();
    expect(action.type).toEqual(types.CHECK_BOARD);
  });

});