import React from 'react';

class InlineInput extends React.Component {
  render() {
    const { type, name, placeholder, value, handleChange, obj} = this.props;

    return (
      <input 
        className='inline-input'
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(typeof obj === 'undefined') ? (e) => handleChange(e) : (e) => handleChange(e, obj)}
      />
    );
  };
};

export default InlineInput;
