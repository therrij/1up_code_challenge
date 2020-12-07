import axios from 'axios';
import * as actions from '../constants/actions';


export const fetchUser = async (dispatch) => {
    try {
        const response = await axios.get('/api/user');
        dispatch({ type: actions.USER_LOADED, payload:  response.data });
    } catch(err) {
        dispatch({ type: actions.USER_LOAD_ERROR });
    }
};

export const loginUser = async (userData, dispatch) => {
    dispatch({ type: actions.USER_LOADING });
    try {
        const response = await axios.post('/api/login', userData);
        dispatch({ type: actions.USER_LOADED, payload:  response.data });
    } catch(err) {
        dispatch({ type: actions.USER_LOAD_ERROR });
    }
};

export const logoutUser = async (dispatch) => {
    try {
        await axios.post('/api/logout');
        dispatch({ type: actions.USER_LOGGED_OUT });
    } catch(err) {
        dispatch({ type: actions.USER_LOAD_ERROR });
    }
};