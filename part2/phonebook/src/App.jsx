import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService";

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgray",
    fontSize: "20px",
    border: "2px solid green",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  return <div style={notificationStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [notification, setNotification] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumbersChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchedName(event.target.value);
  };

  const addPerson = async (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    try {
      if (existingPerson) {
        if (
          window.confirm(
            `${newName} is already added to the phonebook. Replace the old number with a new one?`
          )
        ) {
          const updatedPerson = { ...existingPerson, number: newNumber };

          await personsService.update(existingPerson.id, updatedPerson);

          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : updatedPerson
            )
          );
          setNewName("");
          setNewNumber("");
          showNotification(`Number updated for ${newName}`, "success");
        }
      } else {
        const newPerson = { name: newName, number: newNumber };

        const createdPerson = await personsService
          .create(newPerson)
          .then((createdPerson) => {
            setPersons([...persons, createdPerson]);
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
          });

        setNewName("");
        setNewNumber("");
        showNotification(`Added ${newName} to the phonebook`, "success");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 404) {
        showNotification(`Person '${newName}' not found.`, "error");
      } else {
        showNotification(
          "Failed to perform the operation. Please try again later.",
          "error"
        );
      }
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification message={notification} />}
      <Filter
        searchedName={searchedName}
        handleSearchChange={handleSearchName}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumbersChange={handleNumbersChange}
        addPerson={addPerson}
        errorMessage={errorMessage}
      />
      <Persons
        persons={persons}
        searchedName={searchedName}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
