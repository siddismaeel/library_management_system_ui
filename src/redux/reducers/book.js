import { GET_BOOKS, SAVE_BOOK, GET_BOOK, GET_BOOK_DROPDOWN } from "../actions/types"

const initialState = {
    books:[],
    book:{},
    booksForDropdown:[]
  }

 export const book = (state = initialState, action) =>{

    switch(action.type){
        case GET_BOOKS:{
            return {
                ...state,
                books:action.payload.data
            }
        }
        case SAVE_BOOK:{
            return{
                ...state,
                books:[{...action.payload.data}, ...state.books]
            }
        }
        case GET_BOOK:{
            return{
                ...state,
                book:action.payload.data
            }
        }
        case GET_BOOK_DROPDOWN:{
            return{
                ...state,
                booksForDropdown:action.payload.data
            }
        }
        default:
            return state
    }
  }
  export default  book