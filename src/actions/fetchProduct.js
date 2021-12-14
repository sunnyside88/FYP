import { FETCH_REQUEST, FETCH_SUCCESS } from "../constant/constant";
import axios from "axios";

export const fetchProduct = (id) => (dispatch) =>{

    const url = "http://localhost:8000/api/products/"

    axios.get(url + id, { crossdomain: true })
            .then(res => {
                let data = res.data
                return dispatch({type:FETCH_SUCCESS, payload:data})
            })
}