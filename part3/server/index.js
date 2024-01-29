require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/phonebook");

// let phoneBookData = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

morgan.token("postData", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// middlewares
app.use(express.static("dist"));
app.use(cors());
// Use morgan middleware with the custom token and 'tiny' configuration
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postData",
    { stream: process.stdout }
  )
);
app.use(express.json()); // Parse JSON bodies
//end of middlewares

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// route to get all persons
app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => {
      console.error("Error fetching phonebook entries:", error);
    });
});

// Route to get info for a single person based on id
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      }
    })
    .catch((error) => {
      next(error);
    });
});

// app.get('/info', (req, res) => {
//   const personsNumber = phoneBookData.filter(element => typeof element === 'object').length
//   const requestTime = new Date()
//   const responseText = `
//     Phonebook has info for ${personsNumber} people
//     <br/>
//     Time of Request: ${requestTime.toLocaleString()}
//     `

//   res.send(responseText)
// })

// route to get info for a single person based on id

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((persons) => {
    res.json(persons);
  });
});

// route to delete a person by id
app.delete("/api/persons/:id", (req, res, next) => {
  // const id = Number(req.params.id)

  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(201).end();
      console.log(result);
    })
    .catch((error) => {
      next(error);
    });
});

// route to update a person
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  Person.findByIdAndUpdate(req.params.id, { name, number })

    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).json({ error: "Person not found" });
      }
      res.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

// route to add a new person
app.post("/api/persons", (req, res, next) => {
  console.log(req.body);
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => {
      next(error);
    });
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({
      error: "malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

// middleware for errors
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
