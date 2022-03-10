import { REFRESH_GI_LIST } from "../constant/constant";

const initialState = {
  gis: [],
};

export function giReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_GI_LIST:
      return { ...state, gis: [action.payload] };
    default:
      return state;
  }
}
