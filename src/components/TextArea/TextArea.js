import './TextArea.css';
import React from 'react';

class TextArea extends React.Component {
  render() {
    const { label, name, placeholder, value, handleChange } = this.props;

    const withLabel = (
      <label htmlFor={name}>
        <span className='input-label'>{label}</span>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
        />
      </label>
    );

    const withoutLabel = (
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    );

    return ((label) ? withLabel : withoutLabel);
  };
};

export default TextArea;
