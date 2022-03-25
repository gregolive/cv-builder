import './Education.css';
import React from 'react';
import Input from '../Input/Input';

class Education extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: true,
      gradDate1: '',
      school1: '',
      degree1: '',
      gradDate2: '',
      school2: '',
      degree2: '',
    };
  
    this.storeState = this.storeState.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  storeState = () => localStorage.setItem('Education', JSON.stringify(this.state));

  fetchState = () => {
    const savedState = JSON.parse(localStorage.getItem('Education'));
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
    const { edit, gradDate1, school1, degree1, gradDate2, school2, degree2 } = this.state;

    const education2 = (degree2 !== '') ? (
      <article className='education'>
          <p className='date-col'>{gradDate2}</p>
          <div className='details-col'>
            <strong className='degree'>{degree2}</strong>
            <p className='school'>{school2}</p>
          </div>
        </article>
    ) : null;

    const editMode = (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <h2>
          EDUCATION
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </h2>

        <fieldset>
          <h3>DEGREE 1</h3>
          <Input label='Grad Date' type='text' name='gradDate1' placeholder='June 2012' value={gradDate1} handleChange={this.handleChange} />
          <Input label='School' type='text' name='school1' placeholder='Jedi State University' value={school1} handleChange={this.handleChange} />
          <Input label='Degree' type='text' name='degree1' placeholder='Master of Force Control' value={degree1} handleChange={this.handleChange} />
        </fieldset>

        <fieldset>
          <h3>
          DEGREE 2
            <div className='tooltip'>
              <i className="fa-solid fa-circle-info"></i>
              <span className="tooltiptext">Leave Degree field blank to ignore.</span>
            </div>
          </h3>
          <Input label='Grad Date' type='text' name='gradDate2' placeholder='June 2010' value={gradDate2} handleChange={this.handleChange} />
          <Input label='School' type='text' name='school2' placeholder='Stewjon University' value={school2} handleChange={this.handleChange} />
          <Input label='Degree' type='text' name='degree2' placeholder='Bachelor of Lightsaber Arts' value={degree2} handleChange={this.handleChange} />
        </fieldset>
      </form>
    );

    const normalMode = (
      <section>
        <h2>
          EDUCATION
          <button type='button' className='btn edit-btn' onClick={this.toggleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </h2>

        <article className='education'>
          <p className='date-col'>{gradDate1}</p>
          <div className='details-col'>
            <strong className='degree'>{degree1}</strong>
            <p className='school'>{school1}</p>
          </div>
        </article>
        
        {education2}
      </section>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default Education;
