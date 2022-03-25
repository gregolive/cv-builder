import React from 'react';
import Input from '../Form/Input';

class Skills extends React.Component {
  constructor() {
    super();
  
    this.state = {
      activeInput: true,
      skill: '',
      skills: [],
    };
  
    this.storeState = this.storeState.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
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
      skills: this.state.skills.concat(this.state.skill),
    }), () => this.storeState());
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.toggleEdit(e);
    this.forceUpdate();
    console.log(this.state.skills)
  };

  componentDidMount = (prevProps, prevState) => {
    if(prevState !== this.state) {
      this.fetchState();
      this.forceUpdate();
    }
  };

  render() {
    const { activeInput, skill, skills } = this.state;

    const listItems = skills.map((s) => <li>{s}</li> );

    const skillForm = (
      <form>
        <Input label={false} type='text' name='skill' placeholder='Force use' value={skill} handleChange={this.handleChange} />
        <btn></btn>
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

        <article className='dynamic-article'>
          <ul>{listItems}</ul>
        </article>

        {(activeInput) ? skillForm : null}
        
      </section>
    );
  };
};

export default Skills;
