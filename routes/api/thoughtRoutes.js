const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  removeThought,
  updateThought,
  createThoughtReaction,
  // removeReaction,
} = require("../../controllers/thoughtController");

// /api/Thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/Thoughts/:thoughtId
router
  .route("/:thoughtId/")
  .get(getSingleThought)
  .delete(removeThought)
  .put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions/").post(createThoughtReaction);
// .delete(removeReaction);

module.exports = router;
