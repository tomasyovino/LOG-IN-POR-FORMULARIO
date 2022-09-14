const express = require("express");
const session = require("express-session");
const { mongoOptions } = require("../options/mongoDB.js")
const { dataProd } = require("../db/dataProd.js")

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded( { extended: true }));

router.use(session(mongoOptions));

const auth = (req, res, next) => {
    if(req.session.user) {
        return next();
    } else {
        res.redirect("/api/login");
    }
};

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/", auth, (req, res) => {
    res.render("main", {
        user: req.session.user,
        data: dataProd,
    });
});

router.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    const data = { title: title, price: price, thumbnail: thumbnail };
    dataProd.push(data);

    res.redirect("/api");
})

router.post("/login", (req, res) => {
    const username = req.body.user;
    if (username) {
        req.session.user = username;
        res.redirect("/api");
        return;
    }
    res.send("Login error")
});

router.get("/logout", (req, res) => {
    res.render("logout", {
        user: req.session.user,
    });
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: "Logout error", body: err })
        };
    });
    // setTimeout(() => {
    //     window.location.href = "http://localhost:8080/api/login";
    // }, 3000) 
    // Error en consola (ReferenceError: window is not defined) -> No logro identificar cómo generar un redirect post delay.
});

module.exports = {router};