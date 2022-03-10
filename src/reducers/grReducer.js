import { REFRESH_GR_LIST } from "../constant/constant";

const initialState = {
  grs: [],
};

export function grReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_GR_LIST:
      return { ...state, grs: [action.payload] };
    default:
      return state;
  }
}
