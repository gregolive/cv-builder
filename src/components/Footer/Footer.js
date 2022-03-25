import React from 'react';

class Footer extends React.Component {
  render() {
    const { text, link } = this.props;

    return (
      <footer>
         <p>&copy; <a href={link} target='_blank' rel='noreferrer'>{text}</a></p>
      </footer>
    )
  };
};

export default Footer;
