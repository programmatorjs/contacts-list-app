import React from 'react';
import ListItem from './ListItem';
import AddContacts from './AddContacts';
import SearchContacts from './SearchContacts';


const baseUrl = 'http://5.35.84.37:3000';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  
  handleSearchContact = async (query) => {
    const url = `${baseUrl}/api/v1.0/contacts/${query}`;

    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      users: data,
    });

    console.log('current state', this.state);
  };

  async componentDidMount() {
    const url = `${baseUrl}/api/v1.0/contacts`;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      users: data,
    });

    console.log('current state', this.state);
  }

  handleDeleteContact = async (id) => {
    const url = `${baseUrl}/api/v1.0/contacts/${id}`;

    await fetch(url, {
      method: 'DELETE',
    });

    // После удаления контакта из базы данных, нужно обновить список контактов в интерфейсе
    this.fetchContacts();
  };

  fetchContacts = async () => {
    const url = `${baseUrl}/api/v1.0/contacts`;
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      users: data,
    });
  };

  handleUpdateContact = async (name, phone, id) => {
    const { users } = this.state;
    const url = `${baseUrl}/api/v1.0/contacts${id}`;
    await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        phone,
        name,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log('Data from updation of contact', json));

    let updatedUsers = users.map((user) => {
      if (user.id === id) {
        user.name = name;
        user.phone = phone;
      }
      return user;
    });

    this.setState({
      users: updatedUsers,
    });
  };

  handleAddContact = async (name, phone) => {
    const { users } = this.state;
    const url = `${baseUrl}/api/v1.0/contacts`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log('ADD CONTACT', json);

        const newContact = json;
        let updatedUsers = [newContact].concat(users);
        this.setState({
          users: updatedUsers,
        });
      })
      .catch((error) =>
        console.log(
          'There was a problem with the fetch operation: ' + error.message,
        ),
      );
  };

  //=============================================================
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
            {users.length === 0 ? (
              <h1>Пока пусто....</h1>
            ) : (
              users.map((user) => {
                return (
                  <ListItem
                    name={user.name}
                    contact={user.phone}
                    key={user.id}
                    id={user.id}
                    handleDelete={this.handleDeleteContact}
                    handleUpdate={this.handleUpdateContact}
                  />
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
