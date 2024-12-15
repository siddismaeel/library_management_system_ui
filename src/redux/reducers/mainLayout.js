import { SET_PAGE_TITLE } from "../actions/types";

const initialState ={
    pageTitle:""
}

export const mainLayout = (state = initialState, action)=>{

    switch(action.type){
        case SET_PAGE_TITLE:{
            return{
                ...state,
                pageTitle:action.payload
            }
        }
        default:{
            return {...state}
        }
    }
}

export default mainLayout;