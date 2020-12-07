import { useCallback, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../../store';
import { loginUser } from '../../actions/userActions';

function Login() {

    const { state, dispatch } = useContext(store);
    const { user } = state;

    const onSubmit = useCallback(e => {
        e.preventDefault();

        const { email, password } = e.target;

        loginUser({ email: email.value, password: password.value }, dispatch);
        e.target.reset();
    }, []);

    return (
        user.isLoggedIn ? (
        <Route>
            <Redirect to='/' />
        </Route>
        ) : (
            <div>
                <p>
                    Log in!
                </p>
                <form onSubmit={onSubmit}>
                    <label htmlFor='email'>Your Email:<input name="email" /></label>
                    <label htmlFor='password'>Your Password:<input name="password" /></label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    );
}

export default Login;
