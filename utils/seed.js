const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create empty arrays to hold the users and thoughts
  const usersArr = [];
  const thoughtsArr = [];

  // Loop 3 times -- add users to the users array
  for (let i = 0; i < 3; i++) {
    usersArr.push({
      username: users[i].username,
      email: users[i].email,
    });
  }

  for (let i = 0; i < thoughts.length; i++) {
    thoughtsArr.push({
      thoughtText: thoughts[i].thoughtText,
      username: thoughts[i].username,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(usersArr);
  await Thought.collection.insertMany(thoughtsArr);

  // Log out the seed data to indicate what should appear in the database
  console.table(usersArr);
  console.table(thoughtsArr);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
