import { useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { fetchPatients } from '../../actions/patientActions';

import style from './PatientList.module.css';

function PatientList() {
    const { state, dispatch } = useContext(store);
    const { patient, user } = state;

    useEffect(() => { 
        fetchPatients(dispatch);
    }, []);

    const followLink = useCallback(e => {
        e.preventDefault();
        const { system } = e.target;
        const systemId = system.value;
        const { oneupAccessToken: token, oneupClientId: clientId } = user;
        const link = `https://api.1up.health/connect/system/clinical/${systemId}?client_id=${clientId}&access_token=${token}`;
        window.location.href = link;
    });

    const NewPatientForm = () => (
        <form onSubmit={followLink} className={style.systemForm}>
            <label htmlFor='system'>Health System:
                <select name='system' >
                    <option value='4407'>Cerner</option>
                    <option value='11035'>eClinicalWorks</option>
                    <option value=''>Etc...</option>
                </select>
            </label>
            <button type='submit'>
                Connect a New Patient
            </button>
        </form>
    );

    return (
        <div className={style.patientPage}>
            <NewPatientForm />
            <h2>Patients</h2>
            <div>
                {patient.patientList.map(p =>
                    <Patient key={p.resource.id} resource={p.resource} />
                )}
            </div>
        </div>

    );
}

const Patient = (props) => {
    const { resource } = props;
    const { name: names, id, birthDate, gender } = resource;
    return (
        <div>
            <h3>
                {names.map((name, idx) =>
                    <span key={idx}><b>{name.text}</b> ({name.use}) </span>
                )}
            </h3>
            <div><b>Birth Date: </b> {birthDate}</div>
            <div><b>Gender: </b> {gender}</div>
            <Link to={`/patients/${id}`}>View Details</Link>
        </div>
    );
};

export default PatientList;
