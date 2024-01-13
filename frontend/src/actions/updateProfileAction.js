import axios from "axios";
import {
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL
} from "../constants/userConstants";

//update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = { headers: { 'Content-Type': 'multipart/from-data' } }

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
    }
};

//update password
export const updateUserPassword = (password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.put(`/api/v1/password/update`, password, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
    }
};