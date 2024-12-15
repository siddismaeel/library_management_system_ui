import { CLEAR_ISSUE, GET_ISSUANCE, GET_TOTAL_ISSUED } from "../actions/types";

const initialState = {
    issues:[],
    issue:{}
}
export const transaction = (state = initialState, action)=>{

    switch(action.type){
        case GET_TOTAL_ISSUED:{
            return{
                ...state,
                issues:action.payload.data
            }
        }
        case GET_ISSUANCE:{
            return{
                ...state,
                issue:action.payload.data
            }
        }
        case CLEAR_ISSUE :{
            return {
                ...state,
                issue:initialState.issue
            }
        }
        default:{
            return{
                ...state
            }
        }
    }
}

export default transaction;