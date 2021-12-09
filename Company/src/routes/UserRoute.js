const {
  createUser,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  login,
} = require("../controller/UserController");

const router = require("express").Router();
const { checkToken } = require("../../auth/tokenValidation");

router.post("/registration/", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", getUserByUserId);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);
module.exports = router;
