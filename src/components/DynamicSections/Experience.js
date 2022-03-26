import React from 'react';
import Input from '../Form/Input';
import TextArea from '../Form/TextArea';

class Experience extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: true,
      startDate1: '',
      endDate1: '',
      role1: '',
      company1: '',
      duties1: '',
      startDate2: '',
      endDate2: '',
      role2: '',
      company2: '',
      duties2: '',
    };
    this.saveKey = 'Experience';
  
    this.storeState = this.storeState.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  storeState = () => localStorage.setItem(this.saveKey, JSON.stringify(this.state));

  fetchState = () => JSON.parse(localStorage.getItem(this.saveKey));

  handleChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      ...prevState,
      edit: !this.state.edit,
    }), () => this.storeState());
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.toggleEdit();
    this.forceUpdate();
  };

  componentDidMount = (prevProps, prevState) => {
    if(prevState !== this.state) {
      const savedState = this.fetchState();
      if (typeof savedState !== 'undefined') {
        this.setState({
          ...savedState
        });
      }
      this.forceUpdate();
    }
  };

  render() {
    const { 
      edit, startDate1, endDate1, role1, company1, duties1, startDate2, endDate2, role2, company2, duties2,
    } = this.state;

    const experience2 = (role2 !== '') ? (
      <article className='column-article'>
        <p className='date-col'>{startDate2} — {(endDate2 === '') ? 'present' : endDate2}</p>
        <div className='details-col'>
          <strong className='role'>{role2}</strong>
          <p className='company'>{company2}</p>
          <p className='duties'>{duties2}</p>
        </div>
      </article>
    ) : null;

    const editMode = (
      <form className='section-form' onSubmit={(e) => this.onSubmit(e)}>
        <h2>
          EXPERIENCE
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </h2>

        <fieldset>
          <h3>WORK EXPERIENCE 1</h3>
          <div className='date-inputs'>
            <Input label='Start Date' type='text' name='startDate1' placeholder='2018/06' value={startDate1} handleChange={this.handleChange} />
            <Input label='End Date' type='text' name='endDate1' placeholder='2021/10' value={endDate1} handleChange={this.handleChange} />
            <small className='form-notification'>Leave End Date blank for an ongoing experience.</small>
          </div>
          <Input label='Role' type='text' name='role1' placeholder='Master' value={role1} handleChange={this.handleChange} />
          <Input label='Company' type='text' name='company1' placeholder='Jeti Order' value={company1} handleChange={this.handleChange} />
          <TextArea label='Description' name='duties1' placeholder='Claimed the high ground to defeat Darth Vader.' value={duties1} handleChange={this.handleChange}/>
        </fieldset>

        <fieldset>
          <h3>
            WORK EXPERIENCE 2
            <div className='tooltip'>
              <i className="fa-solid fa-circle-info"></i>
              <span className="tooltiptext">Leave Role field blank to ignore.</span>
            </div>
          </h3>
          <div className='date-inputs'>
            <Input label='Start Date' type='text' name='startDate2' placeholder='2014/01' value={startDate2} handleChange={this.handleChange} />
            <Input label='End Date' type='text' name='endDate2' placeholder='2018/04' value={endDate2} handleChange={this.handleChange} />
            <small className='form-notification'>Leave End Date blank for an ongoing experience.</small>
          </div>
          <Input label='Role' type='text' name='role2' placeholder='General' value={role2} handleChange={this.handleChange} />
          <Input label='Company' type='text' name='company2' placeholder='Jeti Order' value={company2} handleChange={this.handleChange} />
          <TextArea label='Description' name='duties2' placeholder='Led troops to many famous victories during the Clone Wars.' value={duties2} handleChange={this.handleChange}/>
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

        <article className='column-article'>
          <p className='date-col'>{startDate1} — {(endDate1 === '') ? 'present' : endDate1}</p>
          <div className='details-col'>
            <strong className='role'>{role1}</strong>
            <p className='company'>{company1}</p>
            <p className='duties'>{duties1}</p>
          </div>
        </article>
        
        {experience2}
      </section>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default Experience;
