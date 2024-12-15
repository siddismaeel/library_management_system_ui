import api from "../../util/api";
import { setAlert } from "./alert";
import { ADD_MEMBERS, GET_MEMBER, GET_MEMBER_DROPDOWN, GET_MEMBERS } from "./types";

export const get_members = () => async (dispatch) => {
    try {
        const res = await api.get('/api/get-member-list');

        dispatch({
            type: GET_MEMBERS,
            payload: res.data
        })
    } catch (error) {

        dispatch(setAlert(error.response ?.data, "danger"));
    }
}

export const add_member = (member) => async (dispatch) => {
    try {
        const res = await api.post('/api/save-member', member);

        dispatch({
            type: ADD_MEMBERS,
            payload: res.data
        })
        dispatch(setAlert(res.data.message, "success"));
        return true;
    } catch (error) {
        dispatch(setAlert(error.response ?.data, "danger"));
        return false;

    }
}

export const get_member = (id) => async (dispatch) => {
    try {
        const res = await api.get(`/api/get-member/${id}`);

        dispatch({
            type: GET_MEMBER,
            payload: res.data
        })
    } catch (error) {

        dispatch(setAlert(error.response ?.data, "danger"));
    }
}
export const get_member_dropdown = () => async (dispatch) => {
    try {
        const res = await api.get(`/api/get-member-dropdown`);

        dispatch({
            type: GET_MEMBER_DROPDOWN,
            payload: res.data
        })
    } catch (error) {
        dispatch(setAlert(error.response ?.data, "danger"));
    }
}