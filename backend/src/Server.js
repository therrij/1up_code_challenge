import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import auth from './middlewares/cookieAuth.js';
import OneupUserAuth from './middlewares/OneupUserAuth.js';
import apiRoutes from './controllers/index.js';


export class Server {

    constructor(secrets) {
        const staticResourcePath = path.resolve('..', 'frontend', 'build');

        this.app = express()
            // Add some basic request logging.
            .use(morgan('dev'))
            // Convenience middleware to parse req bodies to JSON.
            .use(bodyParser.json())
            // Add session cookie middleware, creating a 24hour-valid cookie.
            .use(auth.cookieMiddleware)
            // Set up additional middleware on API routes:
            // - the login/logout routes, which need to come before session checking,
            // - middleware to reject all other API requests unless a session exists,
            .use('/api', auth.unguardedRoutes, auth.sessionGuardMiddleware)
            // - and 1up user middleware, to stuff an access token into the session. 
            .use('/api', new OneupUserAuth(secrets).middleware())
            // Then add all our API endpoints.
            .use('/api', apiRoutes)
            // If we've not matched any API routes, serve the index page.
            .use(express.static(staticResourcePath))
            .get('*', (req, res) => 
                res.sendFile(path.resolve(staticResourcePath, 'index.html'))
            );
    }

    start(port) {
        this.app.listen(port, error => {
            if (error) throw error;
            console.log(`Server is listening on port ${port}.`)
        });
    }
}
