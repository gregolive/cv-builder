import React from 'react';

class Input extends React.Component {
  render() {
    const { label, type, count, name, placeholder, value, handleChange } = this.props;

    return (
      <label htmlFor={(typeof count === 'undefined') ? name : (name + '-' + count)}>
        <span className='input-label'>{label}</span>
        <input 
          type={type}
          id={(typeof count === 'undefined') ? name : (name + '-' + count)}
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
