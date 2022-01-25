import { REFRESH_PRODUCT_LIST} from "../constant/constant";

const initialState = {
    products: [],
}

export function productReducer(state=initialState,action){
    switch(action.type){
        case REFRESH_PRODUCT_LIST:
            return {...state, products:[action.payload]}
         default:
             return state;
    }
 }