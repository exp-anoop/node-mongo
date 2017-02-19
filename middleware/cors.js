var cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'x-auth');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, x-auth');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
}

module.exports = { cors };
