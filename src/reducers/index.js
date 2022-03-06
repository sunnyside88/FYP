import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { contactReducer } from "./contactReducer";
import { invoiceReducer } from "./invoiceReducer";
import { payMethodReducer } from "./payMethodReducer";
import { paymentReducer } from "./paymentReducer";
import { locationReducer } from "./locationReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  contacts: contactReducer,
  invoices: invoiceReducer,
  payMethods: payMethodReducer,
  payments: paymentReducer,
  locations: locationReducer,
});

export default rootReducer;
