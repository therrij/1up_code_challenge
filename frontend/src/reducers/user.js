import * as actions from '../constants/actions';

const initialState = {
    email: '',
    oneupClientId: '',
    oneupAccessToken: '',
    isLoggedIn: false,
    isLoading: true
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.USER_LOADING: {
            return initialState;
        }
        case actions.USER_LOADED: {
            const { email, oneupClientId, oneupAccessToken } = action.payload;
            return {
                email,
                oneupClientId,
                oneupAccessToken,
                isLoggedIn: true,
                isLoading: false
            };
        }
        case actions.USER_LOAD_ERROR: {
            return { isLoggedIn: false, isLoading: false };
        }
        case actions.USER_LOGGED_OUT: {
            return { isLoggedIn: false, isLoading: false };
        }
        default: {
            return state;
        }
    };
};

export default reducer;
