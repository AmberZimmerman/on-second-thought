const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// const headCount = async () =>
//   Student.aggregate()
//     .count("studentCount")
//     .then((numberOfStudents) => numberOfStudents);

// const grade = async (studentId) =>
//   Student.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: ObjectId(studentId) } },
//     {
//       $unwind: "$assignments",
//     },
//     {
//       $group: {
//         _id: ObjectId(studentId),
//         overallGrade: { $avg: "$assignments.score" },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
              // grade: await grade(req.params.studentId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove their thoughts or friends?
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: "User deleted, but no thoughts or friends found",
            })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a user by its id
  updateUser(req, res) {
    console.log(req.body);

    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //  add a new friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

// Add a thought to a user
// addThought(req, res) {
//   console.log("You are adding a thought");
//   console.log(req.body);
//   console.log(req.params.userId);
//   User.findOneAndUpdate(
//     { _id: req.params.userId },
//     { $addToSet: { thoughts: req.body } },
//     { runValidators: true, new: true }
//   )
//     .then((user) =>
//       !user
//         ? res.status(404).json({ message: "No user found with that ID :(" })
//         : res.json(user)
//     )
//     .catch((err) => res.status(500).json(err));
// },
// // Remove assignment from a student
// removeAssignment(req, res) {
//   Student.findOneAndUpdate(
//     { _id: req.params.studentId },
//     { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//     { runValidators: true, new: true }
//   )
//     .then((student) =>
//       !student
//         ? res
//             .status(404)
//             .json({ message: "No student found with that ID :(" })
//         : res.json(student)
//     )
//     .catch((err) => res.status(500).json(err));
// },
