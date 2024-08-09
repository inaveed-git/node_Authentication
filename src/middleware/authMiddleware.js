import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const { token } = req.cookies;

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.isAuthenticated = true;
            req.user = decode;
        } catch (error) {
            req.isAuthenticated = false;
        }
    } else {
        req.isAuthenticated = false;
    }
    next();
};
