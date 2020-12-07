import { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { store } from '../store';
import Login from './common/Login';
import Logout from './common/Logout';
import Loading from './common/Loading';
import Header from './header/Header';
import { fetchUser } from '../actions/userActions';

function App() {
    const { state, dispatch } = useContext(store);
    const { user } = state;

    useEffect(() => { 
        fetchUser(dispatch);
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                {user.isLoading ? <Route component={Loading} /> : null}
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                {!user.isLoggedIn ? <Redirect to='/login' /> : null}
                <Route component={Header} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
