import React from 'react';

class InlineInput extends React.Component {
  render() {
    const { type, name, placeholder, value, handleChange, id} = this.props;

    return (
      <input 
        className='inline-input'
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(typeof id === 'undefined') ? (e) => handleChange(e) : (e) => handleChange(e, id)}
      />
    );
  };
};

export default InlineInput;
