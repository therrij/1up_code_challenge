import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { fetchPatients } from '../../actions/patientActions';

import style from './PatientList.module.css';

function PatientList() {
    const { state, dispatch } = useContext(store);
    const { patient } = state;

    useEffect(() => { 
        fetchPatients(dispatch);
    }, []);

    return (
        <div className={style.patientPage}>
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
                    <span key={idx}>
                        <b>{name.text}</b> ({name.use})
                    </span>
                )}
            </h3>
            <div><b>Birth Date: </b> {birthDate}</div>
            <div><b>Gender: </b> {gender}</div>
            <Link to={`/patients/${id}`}>View Details</Link>
        </div>
    );
};

export default PatientList;
