const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Contact = require("./db.js");
dotenv.config();


const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});


connectToDatabase();
insertContacts();
displayAllContacts();



app.listen(3000, () => {
	console.log("Example app listening on port 3000!");
});

// Connect to DB
async function connectToDatabase() {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster1.d0oxp0v.mongodb.net/?retryWrites=true&w=majority&appName=cluster1`,
			{ useNewUrlParser: true, useUnifiedTopology: true }
		);
		console.log("Connected to DB");
	} catch (error) {
		console.error("Error connecting to DB", error);
	}
}


// Insert documents
async function insertContacts() {
  const contacts = [
    { lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 },
    { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
    { lastName: "Emilie", firstName: "Brouge", email: "emilie.b@gmail.com", age: 40 },
    { lastName: "Alex", firstName: "Brown", age: 4 },
    { lastName: "Denzel", firstName: "Washington", age: 3 }
  ];

  try {
    await Contact.insertMany(contacts);
    console.log("Contacts inserted");
  } catch (error) {
    console.error("Error inserting contacts", error);
  }
}


async function displayAllContacts() {
	try {
		const contacts = await Contact.find();
		console.log(contacts);
	} catch (error) {
		console.error("Error displaying contacts", error);
	}
}