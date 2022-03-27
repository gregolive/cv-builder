import React from 'react';
import uniqid from "uniqid";
import Input from '../Form/Input';
import TextArea from '../Form/TextArea';

class Experience extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: false,
      activeInput: true,
      experience: {
        id: uniqid(),
        startDate: '',
        endDate: '',
        role: '',
        company: '',
        duties: '',
      },
      experiences: [],
    };
    this.saveKey = 'Experience';

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.deleteExperience = this.deleteExperience.bind(this);
    this.editExperience = this.editExperience.bind(this);
    this.saveExperience = this.saveExperience.bind(this);
  };

  storeState = () => localStorage.setItem(this.saveKey, JSON.stringify(this.state));

  fetchState = () => JSON.parse(localStorage.getItem(this.saveKey));

  handleChange = (e) => {
    this.setState({
      experience: {
        ...this.state.experience, 
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

  deleteExperience = (target) => {
    this.setState({
      experiences: this.state.experiences.filter((exp) => exp.id !== target.id),
    }, () => this.storeState());
  };

  editExperience = (e, target) => {
    this.setState({
      experiences: this.state.experiences.map((exp) => {
        if (exp.id === target.id) { exp[e.target.name] = e.target.value };
        return exp; 
      }),
    });
  };

  saveExperience = () => {
    this.setState({
      experience: {
        id: uniqid(),
        startDate: '',
        endDate: '',
        role: '',
        company: '',
        duties: '',
      },
      experiences: this.state.experiences.concat(this.state.experience),
    }, () => this.storeState());
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.saveExperience();
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
    const { edit, activeInput, experience, experiences } = this.state;

    const experienceList = (
      <div>
        {experiences.map((exp) => 
          <article key={exp.id} className='column-article'>
            <p className='date-col'>{exp.startDate} — {(exp.endDate === '') ? 'present' : exp.endDate}</p>
            <div className='details-col'>
              <strong className='role'>{exp.role}</strong>
              <p className='company'>{exp.company}</p>
              <p className='duties'>{exp.duties}</p>
            </div>
          </article>
        )}
      </div>
    );

    const experienceForm = (
      <form className='dynamic-form' onSubmit={(e) => this.onSubmit(e)}>
        <h3>
          NEW WORK EXPERIENCE
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </h3>
        <div className='date-inputs'>
          <Input label='Start Date' type='text' name='startDate' placeholder='2018/06' value={experience.startDate} handleChange={this.handleChange} />
          <Input label='End Date' type='text' name='endDate' placeholder='2021/10' value={experience.endDate} handleChange={this.handleChange} />
          <small className='form-notification'>Leave End Date blank for an ongoing experience.</small>
        </div>
        <Input label='Role' type='text' name='role' placeholder='Master' value={experience.role} handleChange={this.handleChange} />
        <Input label='Company' type='text' name='company' placeholder='Jeti Order' value={experience.company} handleChange={this.handleChange} />
        <TextArea label='Description' name='duties' placeholder='Claimed the high ground to defeat Darth Vader.' value={experience.duties} handleChange={this.handleChange}/>
      </form>
    );

    const newSkillBtn = (
      <button type='button' className='btn new-btn' onClick={this.toggleInput}>+ New Experience</button>
    );

    const experienceEdit = (
      <article className='edit-skill'>
        {experiences.map((exp, i) =>
          <fieldset className='dynamic-fieldset'>
            <h3>
              WORK EXPERIENCE {i + 1}
              <button type='submit' className='btn delete-btn' onClick={() => this.deleteExperience(exp)}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </h3>
            <div className='date-inputs'>
              <Input label='Start Date' type='text' count={i} name='startDate' placeholder='2018/06' value={exp.startDate} handleChange={(e) => this.editExperience(e, exp)} />
              <Input label='End Date' type='text' count={i} name='endDate' placeholder='2021/10' value={exp.endDate} handleChange={(e) => this.editExperience(e, exp)} />
              <small className='form-notification'>Leave End Date blank for an ongoing experience.</small>
            </div>
            <Input label='Role' type='text' count={i} name='role' placeholder='Master' value={exp.role} handleChange={(e) => this.editExperience(e, exp)} />
            <Input label='Company' type='text' count={i} name='company' placeholder='Jeti Order' value={exp.company} handleChange={(e) => this.editExperience(e, exp)} />
            <TextArea label='Description' count={i} name='duties' placeholder='Claimed the high ground to defeat Darth Vader.' value={exp.duties} handleChange={(e) => this.editExperience(e, exp)}/>
          </fieldset>
        )}
      </article>
    );

    const normalMode = (
      <section>
        <h2>
          EXPERIENCE
          <button type='button' className='btn edit-btn' onClick={this.toggleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </h2>

        {(experiences.length > 0) ? experienceList : null}

        {(activeInput) ? experienceForm : newSkillBtn}
      </section>
    );

    const editMode = (
      <form className='section-form' onSubmit={this.toggleEdit}>
        <h2>
          EXPERIENCE
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </h2>

        {(experiences.length > 0) ? experienceEdit : null}
      </form>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default Experience;
