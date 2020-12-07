import React, {createContext, useReducer} from 'react';
import user from './reducers/user';
import patient from './reducers/patient';
import patientEverything from './reducers/patientEverything';


const combineReducers = (reducersObj) => (state, action) =>
    Object.entries(reducersObj).reduce((acc, [key, reducer]) => ({
        ...acc,
        [key]: reducer(acc[key], action),
    }), state);

// Kind of mimic Redux, by combining a bunch of individual reducers.
const allReducers = combineReducers({ user, patient, patientEverything });
// Get the sum of their initial state by running an empty action thru.
const initialState = allReducers({}, {});

// Wrap the whole app in a provider that gives access to state + dispatch,
// so we have a central spot to manage all our state (again, like a Redux lite.)
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer(allReducers, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }