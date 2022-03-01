import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { contactReducer } from "./contactReducer";
import { invoiceReducer } from "./invoiceReducer";
import { payMethodReducer } from "./payMethodReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  contacts: contactReducer,
  invoices:invoiceReducer,
  payMethods:payMethodReducer,
});

export default rootReducer;
