
// Fetch the logged in user and return their email.
const getUser = (req, res) => {
    const { email } = req.session;

    res.json({ email });
};

export default {
    getUser
};