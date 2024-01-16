const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const PORT = 3001


let phoneBookData = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

morgan.token("postData", (req) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body);
    }
    return "";
});

// middlewares 
app.use(cors())
// Use morgan middleware with the custom token and 'tiny' configuration
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData', { stream: process.stdout }));
app.use(express.json()); // Parse JSON bodies
//end of middlewares 


app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.get("/api/persons", (req, res) => {
    res.json(phoneBookData)
})

app.get("/info", (req, res) => {
    const personsNumber = phoneBookData.filter(element => typeof element === "object").length
    const requestTime = new Date();
    const responseText = `
    Phonebook has info for ${personsNumber} people
    <br/>
    Time of Request: ${requestTime.toLocaleString()}
    `;

    res.send(responseText);
})

// route to get info for a single person based on id

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = phoneBookData.find(entry => entry.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).json({ error: "Person not found" })
    }
})

// route to delete a person by id
app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    phoneBookData = phoneBookData.filter(person => person.id !== id);
    res.status(204).end()
})

// route to add a new person 
app.post("/api/persons", (req, res) => {
    console.log(req.body);
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({ error: "Name and number are required" })
    }

    if (phoneBookData.some((entry) => entry.name === name)) {
        return res.status(400).json({ error: "Name already exist" });
    }

    const newPerson = {
        id: Math.floor(Math.random() * 1000000),
        name,
        number

    }

    phoneBookData.push(newPerson)

    res.json(newPerson)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})