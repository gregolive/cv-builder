import React from 'react';
import TextArea from '../Form/TextArea';

class PersonalStatement extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: true,
      statement: '',
    };
  
    this.storeState = this.storeState.bind(this);
    this.fetchState = this.fetchState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  storeState = () => localStorage.setItem('Statement', JSON.stringify(this.state));

  fetchState = () => {
    const savedState = JSON.parse(localStorage.getItem('Statement'));
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
    const { edit, statement } = this.state;

    const editMode = (
      <form className='section-form' onSubmit={(e) => this.onSubmit(e)}>
        <h2>
          PERSONAL STATEMENT
          <button type='submit' className='btn submit-btn'>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </h2>

        <fieldset>
          <TextArea label={false} name='statement' placeholder='Obi-Wan Kenobi' value={statement} handleChange={this.handleChange}/>
        </fieldset>
      </form>
    );

    const normalMode = (
      <section>
        <h2>
          PERSONAL STATEMENT
          <button type='button' className='btn edit-btn' onClick={this.toggleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </h2>

        <article className='static-article'>
          <p>{statement}</p>
        </article>
      </section>
    );

    return ((edit) ? editMode : normalMode);
  };
};

export default PersonalStatement;
