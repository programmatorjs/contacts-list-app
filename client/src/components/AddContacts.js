import React, { Component } from "react";

class AddContacts extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
    };
  }

  handleChange = (inputType, e) => {
    let value = e.target.value;
    if (inputType === "name") {
      this.setState({
        name: value,
      });
    } else {
      
      if (/^\d+$/.test(value) || value === "") {
        this.setState({
          phone: value,
        });
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = this.state;
    const { addContact } = this.props;
    if (name && phone) {
      addContact(name, phone);
      this.setState({
        name: "",
        phone: "",
      });
    }
  };

  render() {
    const { name, phone } = this.state;
    return (
      <div id="add-contacts-container">
        <h1>Добавить контакт</h1>
        <form>
          <input
            placeholder="Введите имя"
            value={name}
            required
            onChange={(e) => this.handleChange("name", e)}
          />
          <input
            placeholder="Введите номер"
            value={phone}
            required
            onChange={(e) => this.handleChange("phone", e)}
          />
          <br />
          <button onClick={this.handleSubmit}>Добавить</button>
        </form>
      </div>
    );
  }
}

export default AddContacts;
