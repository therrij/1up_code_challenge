import axios from 'axios';
import * as actions from '../constants/actions';


export const fetchPatients = async (dispatch) => {
    dispatch({ type: actions.PATIENT_LIST_LOADING });
    try {
        const response = await axios.get('/api/patients');
        dispatch({ type: actions.PATIENT_LIST_LOADED, payload:  response.data });
    } catch(err) {
        dispatch({ type: actions.PATIENT_LIST_LOAD_ERROR });
    }
};

export const fetchPatientEverything = async (patientId, dispatch, state) => {
    const { patientEverything } = state;

    console.log(patientEverything);
    const offset = 0;

    dispatch({ type: actions.PATIENT_EVERYTHING_LOADING });
    try {
        const response = await axios.get(`/api/patients/${patientId}`, {
            params: { offset }
        });
        dispatch({ type: actions.PATIENT_EVERYTHING_LOADED, payload:  response.data });
    } catch(err) {
        dispatch({ type: actions.PATIENT_EVERYTHING_LOAD_ERROR });
    }
};
