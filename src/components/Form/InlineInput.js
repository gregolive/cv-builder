import React from 'react';

class InlineInput extends React.Component {
  render() {
    const { type, placeholder, value, handleChange } = this.props;

    return (
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    );
  };
};

export default InlineInput;
