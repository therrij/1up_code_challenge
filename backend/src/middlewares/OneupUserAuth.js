import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

const API_URL_ROOT = 'https://api.1up.health';

export default class OneupUserApi {
    constructor(secrets) {
        this.APP_CLIENT_ID = secrets.APP_CLIENT_ID;
        this.APP_CLIENT_SECRET = secrets.APP_CLIENT_SECRET;
    }

    middleware() {
        return async (req, res, next) => {
            // If we don't have a 1up user in session, get (or create) one from our app user's email.
            // When this happens, invalidate any current token info in the session.
            if (!req.session.oneupUserId) {
                req.session.oneupUserId = await this._getOrCreateOneupUserId(req.session.email);
                req.session.oneupAccessToken = null;
                req.session.oneupRefreshToken = null;
                req.session.oneupTokenExpiresTime = null;
            }

            let newTokenResponse;
            // If we have an access token but it has expired, grab a new one with the refresh token.
            if (
                req.session.oneupRefreshToken &&
                req.session.oneupTokenExpiresTime &&
                moment(req.session.oneupTokenExpiresTime).isBefore(moment())
            ) {
                newTokenResponse = await this._refreshAccessToken(req.session.oneupRefreshToken);
            // Otherwise, if we lack an access token, generate one now.
            } else if (!req.session.oneupAccessToken) {
                newTokenResponse = await this._generateAccessToken(req.session.email);
            }

            // If we generated a new token for either of the above reasons, write it into the session.
            if (newTokenResponse) {
                req.session.oneupAccessToken = newTokenResponse.access_token;
                req.session.oneupRefreshToken = newTokenResponse.refresh_token;
                req.session.oneupTokenExpiresTime = moment().add(newTokenResponse.expires_in, 'seconds');
            }

            // If we still don't have an access token, boot.
            if (!req.session.oneupAccessToken) {
                res.status(403).send('Looks like you cannot access that.');
            }

            console.log(`Got a token for user ${req.session.email}: ${req.session.oneupAccessToken}`);
            next();
         };
    }

    _getOrCreateOneupUserId = async (email) => {  
        let userData;  
        try {
            console.log(`GETing 1up user ${email}`);
            const response = await axios.get(`${API_URL_ROOT}/user-management/v1/user`, {
                params: { app_user_id: email, client_id: this.APP_CLIENT_ID, client_secret: this.APP_CLIENT_SECRET }
            });

            userData = _.get(response, 'data.entry[0]', {});

            if (!userData.oneup_user_id) {
                console.log(`POSTing 1up user ${email}`);
                const response = await axios.post(`${API_URL_ROOT}/user-management/v1/user`, null, {
                    params: { app_user_id: email, client_id: this.APP_CLIENT_ID, client_secret: this.APP_CLIENT_SECRET }
                });

                userData = _.get(response, 'data', {});
            }

            if (userData.active === false) throw new Error(`User ${email} is inactive.`);

        } catch (error) {
            this._logError('_getOrCreateOneupUserId', error);
        }
        return userData.oneup_user_id;
    };

    _getAuthCodeForOneupUser = async (email) => {
        try {
            console.log(`POSTing to get access code for user ${email}`);
            const response = await axios.post(`${API_URL_ROOT}/user-management/v1/user/auth-code`, null, {
                params: { app_user_id: email, client_id: this.APP_CLIENT_ID, client_secret: this.APP_CLIENT_SECRET }
            });

            const authCode = _.get(response, 'data.code', {});
            return authCode;
        } catch(error) {
            this._logError('_getAuthCodeForOneupUser', error);
        }
    };

    _generateAccessToken = async (email) => {
        // First, get an auth code for the user.
        const code = await this._getAuthCodeForOneupUser(email);

        // Next, exchange the auth code for an oauth access token.
        try {
            console.log(`POSTing to get access token from auth code ${code}`);
            const response = await axios.post(`${API_URL_ROOT}/fhir/oauth2/token`, null, {
                params: { code, client_id: this.APP_CLIENT_ID, client_secret: this.APP_CLIENT_SECRET, grant_type: 'authorization_code' }
            });
            return response.data;
        } catch(error) {
            this._logError('_generateAccessToken', error);
        }
    };

    _refreshAccessToken = async (refreshToken) => {
        try {
            console.log(`POSTing to get access token from refresh token ${refreshToken}`);
            const response = await axios.post(`${API_URL_ROOT}/fhir/oauth2/token`,null, {
                params: { refresh_token: refreshToken, client_id: this.APP_CLIENT_ID, client_secret: this.APP_CLIENT_SECRET, grant_type: 'refresh_token' }
            });
            return response.data;
        } catch(error) {
            this._logError('_refreshAccessToken', error);
        }
    };

    
    _logError = (whereItHappened, error) => {
        const {
            message = 'An unexpected error occurred.',
            request: { path = '-', method = '-' } = {},
            response: { status = '-' } = {}
        } = error;
        console.log(`ERROR in ${whereItHappened}: ${status} requesting '${method} ${path}': ${message}`);
    };
}
