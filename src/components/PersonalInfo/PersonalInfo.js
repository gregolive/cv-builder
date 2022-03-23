import React from 'react';

class PersonalInfo extends React.Component {
  render() {
    return (
      <section>
        <h2>PERSONAL INFORMATION</h2>

        <form>
          <label for='name'>
            Name<input type='text' id='name' name='name' place></input>
          </label>
        </form>
      </section>
    )
  }
}

export default PersonalInfo;
