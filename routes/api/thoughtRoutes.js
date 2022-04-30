const router = require("express").Router();
const {
  getThoughts,
  // getSingleThought,
  // createThought,
} = require("../../controllers/thoughtController");

// /api/Thoughts
router.route("/").get(getThoughts);

// .post(createThought);

// /api/Users/:userId
// router.route("/:userId/").get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/Users/:userId/friends/:friendId
// router
//   .route("/:userId/friends/:friendId/")
//   .post(addFriend)
//   .delete(removeFriend);

module.exports = router;
