import React from 'react';
import uniqid from "uniqid";
import InlineInput from '../Form/InlineInput';

class Skills extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: false,
      activeInput: true,
      skill: {
        id: uniqid(),
        text: '',
      },
      skills: [],
    };
    this.saveKey = 'Skills';
  
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.editSkill = this.editSkill.bind(this);
    this.saveSkill = this.saveSkill.bind(this);
  };

  storeState = () => localStorage.setItem(this.saveKey, JSON.stringify(this.state));

  fetchState = () => JSON.parse(localStorage.getItem(this.saveKey));

  handleChange = (e) => {
    this.setState({
      skill: {
        ...this.state.skill, 
        [e.target.name]: e.target.value,
      }
    });
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    }, () => this.storeState());
  }

  toggleInput = () => {
    this.setState({
      activeInput: !this.state.activeInput,
    });
  };

  deleteSkill = (target) => {
    this.setState({
      skills: this.state.skills.filter((s) => s.id !== target.id),
    }, () => this.storeState());
  };

  editSkill = (e, target) => {
    this.setState({
      skills: this.state.skills.map((s) => {
        if (s.id === target.id) { s[e.target.name] = e.target.value };
        return s; 
      }),
    });
  };

  saveSkill = () => {
    this.setState({
      skill: {
        id: uniqid(),
        text: '',
      },
      skills: this.state.skills.concat(this.state.skill),
    }, () => this.storeState());
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.saveSkill();
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
    const { edit, activeInput, skill, skills } = this.state;

    const skillList = (
      <article className='dynamic-article'>
        <ul>{skills.map((s) => <li key={s.id}>{s.text}</li>)}</ul>
      </article>
    );

    const newSkillForm = (
      <form className='inline-dynamic-form' onSubmit={(e) => this.onSubmit(e)}>
        <InlineInput type='text' name='text' placeholder='Force use' value={skill.text} handleChange={this.handleChange} />
        <button type='submit' className='btn submit-btn inline-btn'>
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </form>
    );

    const newSkillBtn = (
      <button type='button' className='btn new-btn' onClick={this.toggleInput}>+ New Skill</button>
    );

    const editSkills = (
      <article className='edit-entry'>
        {skills.map((s) =>
          <div key={s.id} className='inline-edit'>
            <InlineInput type='text' name='text' value={s.text} handleChange={this.editSkill} obj={s} />
            <button type='submit' className='btn delete-btn inline-btn' onClick={() => this.deleteSkill(s)}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div> 
        )}
      </article>
    );

    const noSkills = (<article className='edit-entry'>No skills to edit 😭</article>);

    const normalMode = (
      <section>
        <h2>
          SKILLS
          <button type='button' className='btn edit-btn' onClick={this.toggleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </h2>

        {(skills.length > 0) ? skillList : null}

        {(activeInput) ? newSkillForm : newSkillBtn}
      </section>
    );

    const editMode = (
      <form className='section-form' onSubmit={this.toggleEdit}>
        <h2>
          SKILLS
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </h2>

        {(skills.length > 0) ? editSkills : noSkills}
      </form>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default Skills;
