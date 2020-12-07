import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from '@jacksonrayhamilton/redux-infinite-scroll';
import { store } from '../../store';
import { fetchPatients, fetchPatientEverything, clearPatientEverything } from '../../actions/patientActions';

import styles from './PatientDetails.module.css';

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
        return () => clearPatientEverything(dispatch);
    }, []);

    const renderRows = () => {
        return (
            patientEverything && patientEverything.entry.map(it =>
                <PatientEntry key={it.resource.id} resource={it.resource} />
            )
        );
    }

    return (
        <div className={styles.detailsPage}>
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
            <div className={styles.detailsContainer}>
                <InfiniteScroll
                    items={renderRows()}
                    hasMore={patientEverything.hasMore}
                    loadingMore={patientEverything.isLoading}
                    loadMore={() => fetchPatientEverything(patientId, dispatch, state)}
                    showLoader={false}
                    holderType='div'
                    className={styles.infiniteScroll}
                />
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
