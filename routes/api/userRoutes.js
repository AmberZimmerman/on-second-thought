const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/Users/:userId
router.route("/:userId/").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/Users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId/")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
