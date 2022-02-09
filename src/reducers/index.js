import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { contactReducer } from "./contactReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  contacts: contactReducer,
});

export default rootReducer;
