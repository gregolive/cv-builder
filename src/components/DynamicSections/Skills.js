import React from 'react';
import uniqid from "uniqid";
import InlineInput from '../Form/InlineInput';

class Skills extends React.Component {
  constructor() {
    super();
  
    this.state = {
      activeInput: true,
      skill: {
        id: uniqid(),
        text: '',
      },
      skills: [],
    };
  
    this.storeState = this.storeState.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  storeState = () => localStorage.setItem('Skills', JSON.stringify(this.state));

  fetchState = () => {
    const savedState = JSON.parse(localStorage.getItem('Skills'));
    if (typeof savedState !== 'undefined') {
      this.setState({
        ...savedState
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      activeInput: this.state.activeInput,
      skill: {
        id: this.state.skill.id,
        text: e.target.value,
      },
      skills: this.state.skills,
    });
  };

  toggleForm = () => {
    this.setState(() => ({
      activeInput: false,
      skill: {
        id: uniqid(),
        text: '',
      },
      skills: this.state.skills.concat(this.state.skill),
    }), () => this.storeState());
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.toggleForm();
    this.forceUpdate();
  };

  componentDidMount = (prevProps, prevState) => {
    if(prevState !== this.state) {
      this.fetchState();
      this.forceUpdate();
    }
  };

  render() {
    const { activeInput, skill, skills } = this.state;

    const skillList = (
      <article className='dynamic-article'>
        <ul>{skills.map((s) => <li key={s.id}>{s.text}</li>)}</ul>
      </article>
    );

    const skillForm = (
      <form className='inline-form'>
        <InlineInput type='text' placeholder='Force use' value={skill.text} handleChange={this.handleChange} />
        <button type='submit' className='btn submit-btn inline-btn'>
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </form>
    );

    return (
      <section onSubmit={(e) => this.onSubmit(e)}>
        <h2>
          SKILLS
          <button type='submit' className='btn new-btn'>
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </h2>

        {(skills.length > 0) ? skillList : null}

        {(activeInput) ? skillForm : null}
      </section>
    );
  };
};

export default Skills;
