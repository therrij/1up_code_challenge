import { useContext } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { store } from '../../store';
import PatientList from '../patient/PatientList';
import PatientDetails from '../patientDetails/PatientDetails';

import styles from './Header.module.css'

const Header = () => {
    const { state } = useContext(store);
    const { user } = state;

    return (
        <div>
            <header className={styles.appHeader}>
                <h1>Justin Therrien - 1up Code Test App</h1>
                <div><b>User:</b> {user.email}</div>
                <Link to='/logout'>log out</Link>
            </header>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/patients' />
                </Route>
                <Route path='/patients/:patientId' component={PatientDetails} />
                <Route path='/patients' component={PatientList} />
                <Route component={() => <p>404 Not Found!</p>} />
            </Switch>
        </div>
    );
};

export default Header;
