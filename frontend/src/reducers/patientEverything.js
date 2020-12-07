import * as actions from '../constants/actions';


const initialState = {
    entry: [],
    link: [],
    total: 0,
    isLoading: false,
    isError: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.PATIENT_EVERYTHING_LOADING: {
            return initialState;
        }
        case actions.PATIENT_EVERYTHING_LOADED: {
            return { ...action.payload, isLoading: false };
        }
        case actions.PATIENT_EVERYTHING_LOAD_ERROR: {
            return { ...initialState, isError: true };
        }
        default: {
            return state;
        }
    };
};

export default reducer;
