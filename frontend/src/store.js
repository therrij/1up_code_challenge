import React, {createContext, useReducer} from 'react';
import user from './reducers/user';
import patient from './reducers/patient';
import patientEverything from './reducers/patientEverything';

const combineReducers = (reducersObj) => (state, action) =>
    Object.entries(reducersObj).reduce((acc, [key, reducer]) => ({
        ...acc,
        [key]: reducer(acc[key], action),
    }), state);

const allReducers = combineReducers({ user, patient, patientEverything });
const initialState = allReducers({}, {});

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer(allReducers, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }