const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  // addThought,
  // removeThought,
} = require("../../controllers/userController");

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/Users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

// // /api/Users/:userId/thoughts
// router.route("/:userId/thoughts").post(addThought);

// // /api/Users/:userId/thoughts/:thoughtId
// router.route("/:userId/thoughts/:thoughtId").delete(removeThought);

module.exports = router;
