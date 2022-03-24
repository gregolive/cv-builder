import './TextArea.css';
import React from 'react';

class TextArea extends React.Component {
  render() {
    const { name, placeholder, value, handleChange } = this.props;

    return (
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    );
  };
};

export default TextArea;
