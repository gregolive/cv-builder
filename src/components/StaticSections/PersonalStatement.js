import React from 'react';
import TextArea from '../Form/TextArea';

class PersonalStatement extends React.Component {
  constructor() {
    super();
  
    this.state = {
      edit: true,
      statement: '',
    };
    this.saveKey = 'Statement';

    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  };

  storeState = () => localStorage.setItem(this.saveKey, JSON.stringify(this.state));

  fetchState = () => JSON.parse(localStorage.getItem(this.saveKey));

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    }, () => this.storeState());
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.toggleEdit();
    this.forceUpdate();
  };

  componentDidMount = () => {
    const savedState = this.fetchState();
    if (typeof savedState !== 'undefined') {
      this.setState({
        ...savedState
      });
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
          <TextArea label={false} name='statement' placeholder='May the force be with you...' value={statement} handleChange={this.handleChange}/>
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
