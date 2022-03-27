import React from 'react';
import Input from '../Form/Input';

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
    this.saveKey = 'Information';

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  };

  storeState = () => localStorage.setItem(this.saveKey, JSON.stringify(this.state));

  fetchState = () => JSON.parse(localStorage.getItem(this.saveKey));

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    }, () => this.storeState());
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.toggleEdit();
    this.forceUpdate();
  };

  componentDidMount = () => {
    const savedState = this.fetchState();
    if (typeof savedState !== 'undefined') {
      this.setState({
        ...savedState
      });
      this.forceUpdate();
    }
  };

  render() {
    const { edit, name, title, phone, email, linkedin } = this.state;

    const editMode = (
      <form className='section-form' onSubmit={(e) => this.onSubmit(e)}>
        <h2>
          PERSONAL INFORMATION
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-check"></i>
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

        <article className='static-article'>
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
