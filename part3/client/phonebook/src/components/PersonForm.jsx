import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumbersChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <h2>Add a new number</h2>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumbersChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
