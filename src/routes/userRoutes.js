import express from 'express';
import { isAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", isAuth, (req, res) => {
    res.render("home", { isAuthenticated: req.isAuthenticated });
});

router.get("/home", isAuth, (req, res) => {
    res.render("home", { isAuthenticated: req.isAuthenticated });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/reg", (req, res) => {
    res.render("register");
});

export default router;
