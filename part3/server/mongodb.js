const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("node mongodb.js <password> [name] [number]");
  process.exit(1);
}

const password = process.argv[2];
const dbName = "phonebook";

const url = `mongodb+srv://polibos6366:${password}@notes.f4whkei.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  // Display all persons in the phonebook
  Person.find({}).then((persons) => {
    console.log("Phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // add a new person to phonebook
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then(() => {
    console.log(`New Person ${name} with number ${number} added to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid number of arguments");
  mongoose.connection.close();
}
