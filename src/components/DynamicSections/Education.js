import React from 'react';
import uniqid from "uniqid";
import Input from '../Form/Input';
import TextArea from '../Form/TextArea';

class Education extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: false,
      activeInput: true,
      education: {
        id: uniqid(),
        startDate: '',
        gradDate: '',
        school: '',
        degree: '',
        honors: '',
      },
      educations: [],
    };
    this.saveKey = 'Education';

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);
    this.editEducation = this.editEducation.bind(this);
    this.saveEducation = this.saveEducation.bind(this);
  };

  storeState = () => localStorage.setItem(this.saveKey, JSON.stringify(this.state));

  fetchState = () => JSON.parse(localStorage.getItem(this.saveKey));

  handleChange = (e) => {
    this.setState({
      education: {
        ...this.state.education, 
        [e.target.name]: e.target.value,
      }
    });
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    }, () => this.storeState());
  };

  toggleInput = () => {
    this.setState({
      activeInput: !this.state.activeInput,
    });
  };

  deleteEducation = (target) => {
    this.setState({
      educations: this.state.educations.filter((edu) => edu.id !== target.id),
    }, () => this.storeState());
  };

  editEducation = (e, target) => {
    this.setState({
      educations: this.state.educations.map((edu) => {
        if (edu.id === target.id) { edu[e.target.name] = e.target.value };
        return edu; 
      }),
    });
  };

  saveEducation = () => {
    this.setState({
      education: {
        id: uniqid(),
        startDate: '',
        gradDate: '',
        school: '',
        degree: '',
        honors: '',
      },
      educations: this.state.educations.concat(this.state.education),
    }, () => this.storeState());
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.saveEducation();
    this.toggleInput();
    this.forceUpdate();
  };

  componentDidMount = () => {
    const savedState = this.fetchState();
    if (typeof savedState !== 'undefined') {
      this.setState({
        ...savedState,
      });
      this.forceUpdate();
    }
  };

  render() {
    const { edit, activeInput, education, educations } = this.state;

    const educationList = (
      <div>
        {educations.map((edu) => 
          <article key={edu.id} className='column-article'>
            <p className='date-col'>{edu.gradDate}</p>
            <div className='details-col'>
              <strong className='degree'>{edu.degree}</strong>
              <p className='school'>{edu.school}</p>
              <p className='honors'>{edu.honors}</p>
            </div>
          </article>
        )}
      </div>
    );

    const newEducationForm = (
      <form className='dynamic-form' onSubmit={(e) => this.onSubmit(e)}>
        <h3>
          NEW DEGREE
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </h3>
        <Input label='Grad Date' type='text' name='gradDate' placeholder='June 2012' value={education.gradDate} handleChange={this.handleChange} />
        <Input label='School' type='text' name='school' placeholder='Jedi State University' value={education.school} handleChange={this.handleChange} />
        <Input label='Degree' type='text' name='degree' placeholder='Master of Force Control' value={education.degree} handleChange={this.handleChange} />
        <TextArea label='Description' name='honors' placeholder='Graduated with high honors.' value={education.honors} handleChange={this.handleChange}/>
      </form>
    );

    const newEducationBtn = (
      <button type='button' className='btn new-btn' onClick={this.toggleInput}>+ New Degree</button>
    );

    const editEducations = (
      <article className='edit-entry'>
        {educations.map((edu, i) =>
          <fieldset className='dynamic-fieldset'>
            <h3>
              DEGREE {i + 1}
              <button type='submit' className='btn delete-btn' onClick={() => this.deleteEducation(edu)}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </h3>
            <Input label='Grad Date' type='text' count={i} name='gradDate' placeholder='June 2012' value={edu.gradDate} handleChange={(e) => this.editEducation(e, edu)} />
            <Input label='School' type='text' count={i} name='school' placeholder='Jedi State University' value={edu.school} handleChange={(e) => this.editEducation(e, edu)} />
            <Input label='Degree' type='text' count={i} name='degree' placeholder='Master of Force Control' value={edu.degree} handleChange={(e) => this.editEducation(e, edu)} />
            <TextArea label='Description' count={i} name='honors' placeholder='Graduated with high honors.' value={edu.honors} handleChange={(e) => this.editEducation(e, edu)} />
          </fieldset>
        )}
      </article>
    );

    const noEducations = (<article className='edit-entry'>No degrees to edit 😭</article>);

    const normalMode = (
      <section>
        <h2>
          EDUCATION
          <button type='button' className='btn edit-btn' onClick={this.toggleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </h2>

        {(educations.length > 0) ? educationList : null}

        {(activeInput) ? newEducationForm : newEducationBtn}
      </section>
    );

    const editMode = (
      <form className='section-form' onSubmit={this.toggleEdit}>
        <h2>
          EDUCATION
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </h2>

        {(educations.length > 0) ? editEducations : noEducations}
      </form>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default Education;
