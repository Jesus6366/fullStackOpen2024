import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/personsService';

const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgray',
    fontSize: '20px',
    border: `2px solid ${isError ? 'red' : 'green'}`,
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };
  return <div style={notificationStyle}>{message}</div>;
};

const validatePhoneNumber = (phoneNumber) => {
  const regex = /^(0[2-9]|1[0-9])-\d{7,}$/;
  return regex.test(phoneNumber);
};


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then(data => setPersons(data));
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumbersChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = event => {
    setSearchedName(event.target.value);
  };

  const addPerson = async event => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    try {
      if (existingPerson) {
        if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
          const updatedPerson = { ...existingPerson, number: newNumber };
          await personsService.update(existingPerson.id, updatedPerson);
          setPersons(persons.map(person => (person.id !== existingPerson.id ? person : updatedPerson)));
          setNewName('');
          setNewNumber('');
          showNotification(`Number updated for ${newName}`, false);
        }
      } else {
        const newPerson = { name: newName, number: newNumber };


        if (!validatePhoneNumber(newNumber)) {
          showNotification('Invalid phone number format. Please use the format: 09-1234556', true);
          return;
        }

        const createdPerson = await personsService
          .create(newPerson)
          .then(createdPerson => {
            setPersons([...persons, createdPerson]);
            setNewName('');
            setNewNumber('');
            showNotification(`Added ${newName} to the phonebook`, false);
          })
          .catch(error => {
            // this is the way to access the error message
            showNotification(error.response.data.error, true);
            console.log(error.response.data.error);
          });
      }
    } catch (error) {
      console.error('Error:', error);

      if (error.response && error.response.status === 404) {
        showNotification(`Person '${newName}' not found.`, true);
      } else {
        showNotification('Failed to perform the operation. Please try again later.', true);
      }
    }
  };

  const showNotification = (message, isError) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification message={notification.message} isError={notification.isError} />}
      <Filter searchedName={searchedName} handleSearchChange={handleSearchName} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumbersChange={handleNumbersChange}
        addPerson={addPerson}
      />
      <Persons persons={persons} searchedName={searchedName} setPersons={setPersons} />
    </div>
  );
};

export default App;
