import { GET_DASHBOARD_DATA } from "../actions/types"

const initialState = {
    dashboardData:{}
}

export const dashboard = (state = initialState, action)=>{
    switch(action.type){
        case GET_DASHBOARD_DATA:{
            return{
                ...state,
                dashboardData:action.payload.data
            }
        }
        default:{
            return {...state}
        }
    }
}