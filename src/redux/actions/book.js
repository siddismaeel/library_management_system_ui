import api from "../../util/api"
import { setAlert } from "./alert";
import { GET_BOOK, GET_BOOK_DROPDOWN, GET_BOOKS, SAVE_BOOK } from "./types";

export const save_book = (book) => async (dispatch) => {

    try {
        const res = await api.post('/api/save-book', book);
        dispatch({
            type: SAVE_BOOK,
            payload: res.data
        })
        dispatch(setAlert(res.data.message, "success"));
        return true;
    } catch (error) {
        dispatch(setAlert(error.response?.data, "danger"));
        return false;
    }
}
export const get_books = () => async (dispatch) => {

    try {
        const res = await api.get(`/api/get-book-list`);
        dispatch({ type: GET_BOOKS, payload: res.data });
    } catch (error) {
        dispatch(setAlert(error.response?.data, "danger"));
    }
}
export const get_book = (id) => async (dispatch) => {

    try {
        const res = await api.get(`/api/get-book/${id}`);

        dispatch({ type: GET_BOOK, payload: res.data });
    } catch (error) {
        dispatch(setAlert(error.response?.data, "danger"));
    }
}

export const get_books_for_dropdown = () => async (dispatch) => {

    try {
        const res = await api.get(`/api/get-book-dropdown`);
        dispatch({ type: GET_BOOK_DROPDOWN, payload: res.data });
    } catch (error) {
        dispatch(setAlert(error.response?.data, "danger"));
    }
}