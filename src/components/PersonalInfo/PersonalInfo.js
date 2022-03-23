import './PersonalInfo.css';
import React from 'react';
import Input from '../Input/Input.js';

class PersonalInfo extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: true,
      name: '',
      title: '',
      phone: '',
      email: '',
      linkedin: '',
    };
  
    this.storeState = this.storeState.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  storeState() {
    localStorage.setItem('Personal', JSON.stringify(this.state));
    console.log(this.state.edit)
  };

  fetchState() {
    const savedState = JSON.parse(localStorage.getItem('Personal'));
    if (typeof savedState !== 'undefined') {
      this.setState({
        ...savedState
      });
    }
  };

  handleChange(e) {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  toggleEdit() {
    const newEdit = (this.state.edit) ? false : true;
    this.setState((prevState) => ({
      ...prevState,
      edit: newEdit,
    }), () => this.storeState());
  }

  onSubmit(e) {
    e.preventDefault();
    this.toggleEdit();
    this.forceUpdate();
  };

  componentDidMount(prevProps, prevState) {
    if(prevState !== this.state) {
      this.fetchState();
      this.forceUpdate();
    }
  };

  render() {
    const { edit, name, title, phone, email, linkedin } = this.state;

    const editMode = (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <h2>
          PERSONAL INFORMATION
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-user-check"></i>
          </button>
        </h2>

        <fieldset>
          <Input label='Name' type='text' name='name' placeholder='Obi-Wan Kenobi' value={name} handleChange={this.handleChange} />
          <Input label='Title' type='text' name='title' placeholder='Jeti Master' value={title} handleChange={this.handleChange} />
          <Input label='Phone' type='tel' name='phone' placeholder='123-456-7890' value={phone} handleChange={this.handleChange} />
          <Input label='Email' type='email' name='email' placeholder='ben.kenobi@jeti.com' value={email} handleChange={this.handleChange} />
          <Input label='LinkedIn' type='text' name='linkedin' placeholder='linkedin.com/in/ben-kenobi' value={linkedin} handleChange={this.handleChange} />
        </fieldset>
      </form>
    );

    const normalMode = (
      <section>
        <h2>
          PERSONAL INFORMATION
          <button type='button' className='btn edit-btn' onClick={this.toggleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </h2>

        <article className='personal-information'>
          <div>
            <strong className='cv-name'>{name}</strong>
            <p className='cv-title'>{title}</p>
          </div>
          <div className='cv-contact'>
            <p><span className='contact-title'>Phone:</span> {phone}</p>
            <p><span className='contact-title'>E-mail:</span> {email}</p>
            <p className='linkedin'><span className='contact-title'>LinkedIn:</span> {linkedin}</p>
          </div>
        </article>
      </section>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default PersonalInfo;
