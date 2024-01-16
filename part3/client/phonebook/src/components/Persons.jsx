// components/Persons.js
import React from 'react';
import personsService from '../services/personsService';


const Persons = ({ persons, searchedName, setPersons }) => {
    const filterPersons = persons.filter(person =>
        person.name.toLowerCase().includes(searchedName.toLowerCase())
    );

    const handleDelete = (id, name) => {
        if (window.confirm(`Do you really want to delete ${name}?`)) {
            personsService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting person:', error);
                    alert('Failed to delete person.');
                });
        }
    };

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {filterPersons.map((person) => (
                    <li key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Persons;
