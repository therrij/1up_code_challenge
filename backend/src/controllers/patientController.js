import axios from 'axios';

const API_URL_ROOT = 'https://api.1up.health';

// Fetch a list of all patients our user has access to.
const getAll = async (req, res) => {
    const { oneupAccessToken } = req.session;

    try {
        const response = await axios.get(`${API_URL_ROOT}/fhir/dstu2/Patient/`, {
            headers: {
                Authorization: 'Bearer ' + oneupAccessToken
            }
        });
        
        res.json(response.data);
    } catch (error) {
        res.status().json(error);
    }
};

// Fetch details for one patient.
const getOne = async (req, res) => {
    const { oneupAccessToken } = req.session;
    const { patientId } = req.params;
    const { offset } = req.query;

    try {
        const response = await axios.get(`${API_URL_ROOT}/fhir/dstu2/Patient/${patientId}/$everything`, {
            headers: {
                Authorization: 'Bearer ' + oneupAccessToken
            },
            params: {
                _skip: offset || 0
            }
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json(error);
    }
    
};

// Just a stub, but I'd define further routes and their controllers
// like this, with the defs in index.js and the methods here.
const createOne = async (req, res) => {
    res.status(500).json({ message: 'Not implemented.' });
};

const deleteOne = async (req, res) => {
    res.status(500).json({ message: 'Not implemented.' });
};

export default {
    getAll,
    getOne,
    createOne,
    deleteOne
};