import { REFRESH_GI_LIST, REFRESH_POPULAR_ITEM } from "../constant/constant";

const initialState = {
  gis: [],
  popularItems:[],
};

export function giReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_GI_LIST:
      return { ...state, gis: [action.payload] };
    case REFRESH_POPULAR_ITEM:
      return { ...state, popularItems: [action.payload] };
    default:
      return state;
  }
}
