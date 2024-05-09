import * as Actions from "./constants";

export const boxAction = (payload) => async (dispatch) => {
  dispatch({
    type: Actions.BOX,
    payload,
  });
};

export const paletteAction = (payload) => async (dispatch) => {
  dispatch({
    type: Actions.PALETTE,
    payload,
  });
};

export const patternAction = (payload) => async (dispatch) => {
  dispatch({
    type: Actions.PATTERN,
    payload,
  });
};

export const scaleAction = (payload) => async (dispatch) => {
  dispatch({
    type: Actions.SCALE,
    payload,
  });
};
