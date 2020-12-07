import { Router } from 'express';
import cookieSession from 'cookie-session';

// Middleware to add a session cookie to requests.
const cookieMiddleware = cookieSession({
    name: '1up_code_challenge',
    keys: ['just', 'for', 'testing'],
    maxAge: 24 * 60 * 60 * 1000
});

// Middleware to reject a request if it hasn't come from a session with a 
// logged-in user's email in it.
const sessionGuardMiddleware = (req, res, next) => {
    if (req.session.email) {
        // Make a change to the session every minute - so the session cookie
        // is rewritten and resent to the client.
        req.session.lastRefreshed = Math.floor(Date.now() / 60e3);
        next();
    } else {
        res.status(401).json({ message: 'You must sign in to access this resource.' });
    }
};


// Controller to create a session with the user's email, when they login.
const loginController = (req, res, next) => {
    const { email, password } = req.body;

    // Hardcoded for the demo - but this is where we'd do a check against
    // this app's user authentication, however that be implemented. Right
    // now, just let any user through as long as they have the test password.
    const isThisUserOkay = email && (password === 'test123');

    if (isThisUserOkay) {
        req.session.email = email;

        res.sendStatus(200);
    } else {
        res.status(404).json({ message: 'Double check your login information and try again.' });
    }
};

// Controller to destroy the session when the user logs out.
const logoutController = (req, res, next) => {
    req.session = null;
    res.sendStatus(200);
};


const unguardedRoutes = Router();

unguardedRoutes.route('/login')
    .post(loginController);

unguardedRoutes.route('/logout')
    .get(logoutController)
    .post(logoutController);


export default {
    cookieMiddleware,
    sessionGuardMiddleware,
    unguardedRoutes
};
