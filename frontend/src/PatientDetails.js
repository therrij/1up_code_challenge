import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from './store';
import { fetchPatients, fetchPatientEverything } from './actions/patientActions';

function PatientDetails(props) {
    const { match: { params } } = props;
    const { patientId } = params;
    const { state, dispatch } = useContext(store);
    const { patient, patientEverything } = state;

    const loadedPatientDetails = patient.patientList.find(p => p.resource.id === patientId);
    const patientDetails = loadedPatientDetails ? loadedPatientDetails.resource : null;

    useEffect(() => { 
        if (!patientDetails) fetchPatients(dispatch);
    }, [patientDetails]);

    useEffect(() => {
        fetchPatientEverything(patientId, dispatch, state);
    }, []);

    return (
        <div>
            <Link to='/patients'>back to list</Link>
            <h3>
                {patientDetails ? (patientDetails.name.map((name, idx) =>
                    <span key={idx}>
                        <b>{name.text}</b> ({name.use})
                    </span>
                )) : (
                    <i>loading...</i>
                )}
            </h3>
            <div>
                {patientEverything && patientEverything.entry.map(it =>
                    <PatientEntry key={it.resource.id} resource={it.resource} />
                )}
            </div>
        </div>
    );
}

const PatientEntry = (props) => {
    const { resource } = props;
    return (resource.text) ? (
        <div dangerouslySetInnerHTML={{__html: resource.text.div}} />
    ) : (
        <div>
            {resource.resourceType} (Etc... There is more stuff here but no .text attribute.)
        </div>
    );
};

export default PatientDetails;
