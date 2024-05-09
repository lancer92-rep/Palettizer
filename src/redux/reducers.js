import * as Actions from "./constants";

const initialState = {
  box: { width: 200, height: 300 },
  palette: { width: 800, height: 1200 },
  pattern: [],
  scale: 1,
};

export const paletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.BOX:
      return {
        ...state,
        box: action.payload,
      };
    case Actions.PALETTE:
      return {
        ...state,
        palette: action.payload,
      };
    case Actions.PATTERN:
      return {
        ...state,
        pattern: action.payload,
      };
    case Actions.SCALE:
      return {
        ...state,
        scale: action.payload,
      };
    default:
      return state;
  }
};
