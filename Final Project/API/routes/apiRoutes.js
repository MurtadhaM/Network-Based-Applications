const Router = require('express').Router;
const router = Router();
const auth = require("../middlewares/auth");

const userController = require('../controllers/apiController');

router.get("/welcome", auth, (req, res) => {
res.status(200).send("Welcome 🙌 ");
});

router.put("/register",  async (req, res) => {

userController.register(req, res);
});

router.put("/login",  async (req, res) => {

userController.login(req, res);
});

router.delete("/logout", auth, async (req, res) => {
userController.logout(req, res);
});

router.get("/getUserTickets", auth, async (req, res) => {
userController.getUserTickets(req, res);
});

router.put("/addTicket", auth, async (req, res) => {
userController.addTicket(req, res);
});

router.get("/getAvailableTickets", auth, async (req, res) => {
userController.getAvailableTickets(req, res);
});

router.put("/buyTicket", auth, async (req, res) => {
userController.buyTicket(req, res);
});



module.exports = router;
