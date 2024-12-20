import axios from "axios";
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
    DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL
} from "../constants/userConstants";

//Login user
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    };
};

//Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { headers: { "content-Type": "multipart/from-data" } };

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
};

//Load Login user details
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get(`/api/v1/me`)
        dispatch({ type: LOAD_USER_SUCCESS, payload: data?.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

//Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get(`/api/v1/logout`)

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

// get all users (only admin can access)
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/users`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

//Get user details (only admin can access)
export const getUserDetails = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/user/${userId}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
};

// Update user details (only admin can update)
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = { headers: { "content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
    }
};

//Delete user (only admin can delete)
export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/user/${userId}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
    }
}


//Clearing Errors
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};