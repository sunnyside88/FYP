import { REFRESH_UOM_LIST} from "../constant/constant";

const initialState = {
    uoms: [],
}

export function uomReducer(state=initialState,action){
    switch(action.type){
        case REFRESH_UOM_LIST:
            return {...state, uoms:[action.payload]}
         default:
             return state;
    }
 }