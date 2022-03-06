import { REFRESH_LOCATION_LIST} from "../constant/constant";

const initialState = {
    locations: [],
}

export function locationReducer(state=initialState,action){
    switch(action.type){
        case REFRESH_LOCATION_LIST:
            return {...state, locations:[action.payload]}
         default:
             return state;
    }
 }