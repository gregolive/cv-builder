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
  
    this.storeState = this.storeState.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.editSkill = this.editSkill.bind(this);
    this.saveSkill = this.saveSkill.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  storeState = () => localStorage.setItem(this.saveKey, JSON.stringify(this.state));

  fetchState = () => JSON.parse(localStorage.getItem(this.saveKey));

  handleChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      skill: {
        id: this.state.skill.id,
        text: e.target.value,
      },
    }));
  };

  toggleEdit = () => {
    this.setState((prevState) => ({
      ...prevState,
      edit: !this.state.edit,
    }), () => this.storeState());
  }

  toggleInput = () => {
    this.setState((prevState) => ({
      ...prevState,
      activeInput: !this.state.activeInput,
    }));
  };

  deleteSkill = (target) => {
    this.setState({
      skills: this.state.skills.filter((s) => s.id !== target.id)
    });
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
    this.setState((prevState) => ({
      ...prevState,
      skill: {
        id: uniqid(),
        text: '',
      },
      skills: this.state.skills.concat(this.state.skill),
    }), () => this.storeState());
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.saveSkill();
    this.toggleInput();
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
    const { edit, activeInput, skill, skills } = this.state;

    const skillList = (
      <article className='dynamic-article'>
        <ul>{skills.map((s) => <li key={s.id}>{s.text}</li>)}</ul>
      </article>
    );

    const skillForm = (
      <form className='inline-dynamic-form' onSubmit={(e) => this.onSubmit(e)}>
        <InlineInput type='text' placeholder='Force use' value={skill.text} handleChange={this.handleChange} />
        <button type='submit' className='btn submit-btn inline-btn'>
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </form>
    );

    const newSkillBtn = (
      <button type='button' className='btn new-btn' onClick={this.toggleInput}>+ New Skill</button>
    );

    const skillEdit = (
      <article className='edit-skill'>
        {skills.map((s) =>
          <div key={s.id} className='inline-edit'>
            <input type='text' value={s.text} onChange={(e) => this.editSkill(e, s)} />
            <button type='submit' className='btn delete-btn inline-btn' onClick={() => this.deleteSkill(s)}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div> 
        )}
      </article>
    );

    const normalMode = (
      <section>
        <h2>
          SKILLS
          <button type='button' className='btn edit-btn' onClick={this.toggleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </h2>

        {(skills.length > 0) ? skillList : null}

        {(activeInput) ? skillForm : newSkillBtn}
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

        {(skills.length > 0) ? skillEdit : null}
      </form>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default Skills;
