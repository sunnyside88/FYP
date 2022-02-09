import { REFRESH_CONTACT_LIST} from "../constant/constant";

const initialState = {
    contacts: [],
}

export function contactReducer(state=initialState,action){
    switch(action.type){
        case REFRESH_CONTACT_LIST:
            return {...state, contacts:[action.payload]}
         default:
             return state;
    }
 }