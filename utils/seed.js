const connection = require("../config/connection");
const { User } = require("../models");
const { emails, usernames } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];
  console.log({ startUsers: users });

  // Loop 3 times -- add users to the users array
  for (let i = 0; i < 3; i++) {
    const username = usernames[i];
    const email = emails[i];
    console.log({ i, username, email });

    users.push({
      username,
      email,
    });

    console.log({ users });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
