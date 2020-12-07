import * as actions from '../constants/actions';


const initialState = {
    patientList: [],
    total: 0,
    isLoading: false,
    isError: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.PATIENT_LIST_LOADING: {
            return initialState;
        }
        case actions.PATIENT_LIST_LOADED: {
            const { entry, total } = action.payload;
            return { patientList: entry, total, isLoading: false };
        }
        case actions.PATIENT_LIST_LOAD_ERROR: {
            return { ...initialState, isError: true };
        }
        default: {
            return state;
        }
    };
};

export default reducer;
