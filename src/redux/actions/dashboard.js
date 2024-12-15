import api from "../../util/api";
import { setAlert } from "./alert";
import { GET_DASHBOARD_DATA } from "./types";

export const get_dashboard_data = ()=> async(dispatch)=>{
    try{
        const res = await api.get('/api/get-dashboard-data');

        dispatch({
            type:GET_DASHBOARD_DATA,
            payload:res.data
        })
    }catch(error){
        dispatch(setAlert(error.response ?.data, "danger"));
    }
}