const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  // createThought,
} = require("../../controllers/thoughtController");

// /api/Thoughts
router.route("/").get(getThoughts);

// .post(createThought);

// /api/Thoughts/:thoughtId
router.route("/:thoughtId/").get(getSingleThought);

// .delete(deleteUser).put(updateUser);

// /api/Users/:userId/friends/:friendId
// router
//   .route("/:userId/friends/:friendId/")
//   .post(addFriend)
//   .delete(removeFriend);

module.exports = router;
