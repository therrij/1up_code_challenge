
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Test from './Test';

const PatientList = () => <div>PATIENTS</div>
const Login = () => <div>log in idiot</div>

function Routing() {

    const [data, setData] = useState({ isLoading: true });

    useEffect(() => {
        const fetchUser = async () => {
    
            try {
                const response = await axios.get('/api/user');
                setData(response.data);
                console.log(response, data);
            } catch(err) {
                setData({ isLoading: false });
            }
        };
    
        fetchUser();
    }, []);

    const isLoggedIn = data.isLoading || data.email;

    return (
        <BrowserRouter>
            {isLoggedIn ? null : (
                <Route>
                    <Redirect to='/login' />
                </Route>
            )}
            <Switch>
                <Route path='/patients' component={PatientList} />
                <Route path='/test' component={Test} />
                <Route path='/login' component={Login} />

            </Switch>
        </BrowserRouter>
    );
}

export default Routing;
