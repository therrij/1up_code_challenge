import { useEffect, useContext } from 'react';
import { store } from '../../store';
import { logoutUser } from '../../actions/userActions';

function Logout() {

    const { state, dispatch } = useContext(store);
    const { user } = state;

    useEffect(() => {
        logoutUser(dispatch);
    }, []);

    return (
        <div>
            {user.isLoggedIn ? (
                <p>Logging out...</p>
            ) : (
                <p>You have successfully logged out!</p>
            )}
        </div>
    );
}

export default Logout;
