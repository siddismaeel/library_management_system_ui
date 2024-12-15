import { ADD_MEMBERS, GET_MEMBER, GET_MEMBER_DROPDOWN, GET_MEMBERS } from "../actions/types"

const initialState = {
    members: [],
    member:{},
    membersForDropdown:[]
}
export const member = (state = initialState, action) => {

    switch (action.type) {
        case GET_MEMBERS: {
            return {
                ...state,
                members: action.payload.data
            }
        }
        case ADD_MEMBERS: {
            return {
                ...state,
                members: [{ ...action.payload.data }, ...state.members]
            }
        }
        case GET_MEMBER:{
            return{
                ...state,
                member:action.payload.data
            }
        }
        case GET_MEMBER_DROPDOWN:{
            return{
                ...state,
                membersForDropdown:action.payload.data
            }
        }
        default:
            return {
                ...state
            }
    }

}