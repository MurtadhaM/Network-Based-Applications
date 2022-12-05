const Router = require('express').Router;
const router = Router();
const auth = require("../middlewares/auth");

const userController = require('../controllers/userController');

router.get("/welcome", auth, (req, res) => {
res.status(200).send("Welcome 🙌 ");
});

router.post("/register", async (req, res) => {

userController.register(req, res);
});

router.post("/login", async (req, res) => {

userController.login(req, res);
});

router.get("/logout", auth, async (req, res) => {
userController.logout(req, res);
});

router.get("/profile", auth, async (req, res) => {
userController.me(req, res);
});

module.exports = router;
