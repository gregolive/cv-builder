import React from 'react';

class TextArea extends React.Component {
  render() {
    const { label, name, count, placeholder, value, handleChange } = this.props;

    const withLabel = (
      <label htmlFor={(typeof count === 'undefined') ? name : (name + '-' + count)}>
        <span className='input-label'>{label}</span>
        <textarea
          id={(typeof count === 'undefined') ? name : (name + '-' + count)}
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
