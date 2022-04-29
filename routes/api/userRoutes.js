const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  // addThought,
  // removeThought,
} = require("../../controllers/userController");

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/Users/:userId
router.route("/:userId/").get(getSingleUser).delete(deleteUser).put(updateUser);

// need to make a put to update a user by its id

// /api/Users/:userId/thoughts
// router.route("/:userId/thoughts").post(addThought);

// // /api/Users/:userId/thoughts/:thoughtId
// router.route("/:userId/thoughts/:thoughtId").delete(removeThought);

module.exports = router;
