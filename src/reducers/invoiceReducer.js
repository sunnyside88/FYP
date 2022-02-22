import { REFRESH_INVOICE_LIST} from "../constant/constant";

const initialState = {
    invoices: [],
}

export function invoiceReducer(state=initialState,action){
    switch(action.type){
        case REFRESH_INVOICE_LIST:
            return {...state, invoices:[action.payload]}
         default:
             return state;
    }
 }