import React from 'react';

class Input extends React.Component {
  render() {
    const { label, type, name, placeholder, value, handleChange } = this.props;

    return (
      <label htmlFor={name}>
        <span className='input-label'>{label}</span>
        <input 
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
        />
      </label>
    );
  };
};

export default Input;
