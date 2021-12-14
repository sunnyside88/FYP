import { FETCH_REQUEST, FETCH_SUCCESS } from "../constant/constant";

export function productReducer(state={},action){
    switch(action.type){
        case FETCH_REQUEST:
            return action.payload;
         case FETCH_SUCCESS:
             return action.payload;
         default:
             return state;
    }
 }