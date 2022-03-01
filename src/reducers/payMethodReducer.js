import { REFRESH_PAY_METHOD_LIST} from "../constant/constant";

const initialState = {
    payMethods: [],
}

export function payMethodReducer(state=initialState,action){
    switch(action.type){
        case REFRESH_PAY_METHOD_LIST:
            return {...state, payMethods:[action.payload]}
         default:
             return state;
    }
 }