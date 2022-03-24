import './Experience.css';
import React from 'react';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';

class Experience extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: true,
      startDate: '',
      endDate: '',
      role: '',
      company: '',
      duties: '',
    };
  
    this.storeState = this.storeState.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  storeState = () => localStorage.setItem('Experience', JSON.stringify(this.state));

  fetchState = () => {
    const savedState = JSON.parse(localStorage.getItem('Experience'));
    if (typeof savedState !== 'undefined') {
      this.setState({
        ...savedState
      });
    }
  };

  handleChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  toggleEdit = () => {
    const newEdit = (this.state.edit) ? false : true;
    this.setState((prevState) => ({
      ...prevState,
      edit: newEdit,
    }), () => this.storeState());
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.toggleEdit();
    this.forceUpdate();
  };

  componentDidMount = (prevProps, prevState) => {
    if(prevState !== this.state) {
      this.fetchState();
      this.forceUpdate();
    }
  };

  render() {
    const { edit, startDate, endDate, role, company, duties } = this.state;

    const editMode = (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <h2>
          EXPERIENCE
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </h2>

        <fieldset>
          <h3>WORK EXPERIENCE 1</h3>
          <div className='date-inputs'>
            <Input label='Start Date' type='text' name='startDate' placeholder='June 2018' value={startDate} handleChange={this.handleChange} />
            <Input label='End Date' type='text' name='endDate' placeholder='August 2021' value={endDate} handleChange={this.handleChange} />
          </div>
          <Input label='Role' type='text' name='role' placeholder='Master' value={role} handleChange={this.handleChange} />
          <Input label='Company' type='text' name='company' placeholder='Jeti Order' value={company} handleChange={this.handleChange} />
          <TextArea label='Description' name='duties' placeholder='Claimed the high ground to defeat Darth Vader.' value={duties} handleChange={this.handleChange}/>
        </fieldset>
      </form>
    );

    const normalMode = (
      <section>
        <h2>
          EXPERIENCE
          <button type='button' className='btn edit-btn' onClick={this.toggleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </h2>

        <article className='work-experience'>
          <p className='date-range'>{startDate} - {endDate}</p>
          <div>
            <strong>{role}</strong>
            <small>{company}</small>
            <p>{duties}</p>
          </div>
        </article>
      </section>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default Experience;
