import React from 'react';
import ListItem from './ListItem';
import AddContacts from './AddContacts';
import SearchContacts from './SearchContacts';

const baseUrl = 'http://5.35.84.37:3000';
// const baseUrl = 'http://localhost:3000';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = async () => {
    try {
      const url = `${baseUrl}/api/v1.0/contacts`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ users: data });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  };

  handleSearchContact = async (query) => {
    try {
      const url = `${baseUrl}/api/v1.0/contacts/${query}`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ users: data });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  };

  handleDeleteContact = async (id) => {
    try {
      const url = `${baseUrl}/api/v1.0/contacts/${id}`;
      await fetch(url, { method: 'DELETE' });
      await this.fetchContacts();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  };

  handleUpdateContact = async (name, phone, id) => {
    const { users } = this.state;
    try {
      const url = `${baseUrl}/api/v1.0/contacts/${id}`;
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ name, phone }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedContact = await response.json();
      const updatedUsers = users.map((user) => (user.id === id ? updatedContact : user));
      this.setState({ users: updatedUsers });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  };

  handleAddContact = async (name, phone) => {
    console.log('Adding contact:', name, phone);
    const { users } = this.state;
    try {
      const url = `${baseUrl}/api/v1.0/contacts`;
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ name, phone }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newContact = await response.json();
      console.log('New contact ID:', newContact.id); 
      const updatedUsers = [newContact, ...users];
      this.setState({ users: updatedUsers });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  };
  
  

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <AddContacts addContact={this.handleAddContact} />
        <SearchContacts searchContact={this.handleSearchContact} />
        <div id="contact-list-container">
          <header>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1250/1250592.png"
              alt="contact-icon"
            ></img>
            <h1>Список контактов</h1>
          </header>
          <ul>
            {users.map((user) => (
              <ListItem
              name={user.name}
              contact={user.phone}
              key={user.id} 
              id={user.id}
              handleDelete={this.handleDeleteContact}
              handleUpdate={this.handleUpdateContact}
            />
            
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
}

export default App;
