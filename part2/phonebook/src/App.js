import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Filter from './components/Filter'
import axios from 'axios'
import contactService from './services/contactService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filter, setFilter] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  useEffect(() => {
    setFilteredPersons(
      persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()) ||
        person.number.includes(filter)
      )
    )
  }, [persons, filter])

  const filterContact = (event) => {
    setFilter(event.target.value)
  };

  const resetContact = () => {
    setNewName('');
    setNewNumber('');
  }
  const addContact = (event) => {
    event.preventDefault();

    if (newName === '' || newNumber === '') {
      alert('Name and number cannot be empty');
      return;
    }

    const contactObject = {
      name: newName,
      number: newNumber
    };

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson) {
      const overwriteContact = window.confirm(
        `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      );
      if (overwriteContact) {
        axios
          .put(`http://localhost:3001/persons/${existingPerson.id}`, contactObject)
          .then((response) => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : response.data
            ));
            resetContact();
          });
      }
      return;
    }

    contactService.create(contactObject)
    .then((returnedContact) => {
      setPersons(persons.concat(returnedContact))
    })
   
    resetContact()
    console.log(newName, newNumber);
  };

  const deleteContact = (id, name) => {
    
    const confirmDelete = window.confirm(`Delete ${name}?`);

    if (confirmDelete) {
      contactService.deleteData(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => console.log('Error to delete', error));
    }
  };


  const handleContact = (event) => {
    setNewName(event.target.value)  
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterContact}/>
      <h2>Add a new</h2>
      <PersonsForm 
        onSubmit={addContact}
        newName={newName}
        handleContact={handleContact}
        newNumber={newNumber}
        handleNumber={handleNumber}
      /> 
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onClick={deleteContact}/>
    </div>
  )
}

export default App
