import { REFRESH_PAYMENT_LIST } from "../constant/constant";

const initialState = {
  payments: [],
};

export function paymentReducer(state = initialState, action) {
  switch (action.type) {
    case REFRESH_PAYMENT_LIST:
      return { ...state, payments: [action.payload] };
    default:
      return state;
  }
}
