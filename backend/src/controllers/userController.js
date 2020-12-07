
// Fetch the logged in user and return their email.
const getUser = (req, res) => {
    const { email, oneupClientId, oneupAccessToken } = req.session;

    res.json({ email, oneupClientId, oneupAccessToken });
};

export default {
    getUser
};