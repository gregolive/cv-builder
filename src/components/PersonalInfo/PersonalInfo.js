import React from 'react';
import Input from '../Input/Input.js';

class PersonalInfo extends React.Component {
  constructor() {
    super();
  
    this.state = {
      name: '',
      title: '',
      phone: '',
      email: '',
      linkedin: '',
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  handleChange(e) {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  };

  render() {
    const { name, title, phone, email, linkedin } = this.state;

    return (
      <section>
        <h2>PERSONAL INFORMATION</h2>

        <form onSubmit={(e) => this.onSubmit(e)}>
          <Input label='Name' type='text' name='name' placeholder='Obi-Wan Kenobi' value={name} handleChange={this.handleChange} />
          <Input label='Title' type='text' name='title' placeholder='Jeti' value={title} handleChange={this.handleChange} />
          <Input label='Phone' type='tel' name='phone' placeholder='123-456-7890' value={phone} handleChange={this.handleChange} />
          <Input label='Email' type='email' name='email' placeholder='ben.kenobi@jeti.com' value={email} handleChange={this.handleChange} />
          <Input label='LinkedIn' type='text' name='linkedin' placeholder='linkedin.com/in/ben-kenobi' value={linkedin} handleChange={this.handleChange} />
          <button type='submit'>
            Save
          </button>
        </form>
      </section>
    )
  }
}

export default PersonalInfo;
