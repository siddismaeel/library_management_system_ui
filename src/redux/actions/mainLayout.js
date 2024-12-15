import { SET_PAGE_TITLE } from "./types"

export const set_page_title = (pageTitle)=> (dispatch)=>{
    dispatch({
        type:SET_PAGE_TITLE,
        payload:pageTitle
    })
}