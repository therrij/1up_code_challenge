import * as actions from '../constants/actions';


const initialState = {
    entry: [],
    link: [],
    total: 0,
    hasMore: true,
    isLoading: false,
    isError: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.PATIENT_EVERYTHING_CLEAR: {
            return initialState;
        }
        case actions.PATIENT_EVERYTHING_LOADING: {
            return { ...state, isLoading: true };
        }
        case actions.PATIENT_EVERYTHING_LOADED: {
            const { payload } = action;
            const entry = [...state.entry, ...payload.entry];
            return {
                ...payload,
                entry,
                hasMore: entry.length < payload.total,
                isLoading: false
            };
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
