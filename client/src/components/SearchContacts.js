import React, { Component } from "react";

class SearchContacts extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    const { searchContact } = this.props;
    if (query) {
      searchContact(query);
      this.setState({
        query: "",
      });
    }
  };

  render() {
    const { query } = this.state;
    return (
      <div id="search-contacts-container">
        <h1>Поиск контакта</h1>
        <form>
          <input
            placeholder="Введите имя или номер"
            value={query}
            required
            onChange={this.handleInputChange}
          />
          <br />
          <button onClick={this.handleSubmit}>Поиск</button>
        </form>
      </div>
    );
  }
}

export default SearchContacts;
