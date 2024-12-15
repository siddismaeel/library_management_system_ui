import api from "../../util/api";
import { setAlert } from "./alert";
import { CLEAR_ISSUE, GET_ISSUANCE, GET_TOTAL_ISSUED } from "./types";

export const get_total_issued = () => async (dispatch) => {

    try {
        const res = await api.get(`/api/get-issues`);
        dispatch({
            type: GET_TOTAL_ISSUED,
            payload: res.data
        })
    } catch (error) {
        dispatch(setAlert(error.response?.data, "danger"));
    }
}

export const get_issued_book = (book) => async (dispatch) => {

    try {
        const res = await api.post(`/api/issue-book`, book);

        setAlert(res.data.message, "success");

        return true;
    } catch (error) {
        dispatch(setAlert(error.response?.data, "danger"));

        return false;
    }
}
export const issue_book = (book) => async (dispatch) => {

    try {
        const res = await api.post(`/api/issue-book`, book);

        setAlert(res.data.message, "success");

        return true;
    } catch (error) {
        dispatch(setAlert(error.response?.data, "danger"));

        return false;
    }
}

export const return_book = (book) => async (dispatch) => {

    try {
        const res = await api.post(`/api/return-book`, book);

        setAlert(res.data.message, "success");

        return true;
    } catch (error) {
        dispatch(setAlert(error.response?.data, "danger"));

        return false;
    }
}

export const get_issuance = (id) => async (dispatch) => {

    try {
        const res = await api.get(`/api/get-issuance/${id}`);

        dispatch({
            type: GET_ISSUANCE,
            payload: res.data
        })
    } catch (error) {

        dispatch(setAlert(error.response?.data, "danger"));
    }
}

export const clear_issue = () => (dispatch) => dispatch({ type: CLEAR_ISSUE })
