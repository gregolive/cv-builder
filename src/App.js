import './App.css';
import '@fortawesome/fontawesome-free/js/all';
import React from 'react';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import PersonalStatement from './components/PersonalStatement/PersonalStatement';
import Footer from './components/Footer/Footer';

class App extends React.Component { 
  render() {
    return (
      <div>
        <div className='main-container'>
          <main>
            <h1>CV Builder</h1>
            <p className='app-description'>Add your details below to build your resume.</p>
            <PersonalInfo />
            <PersonalStatement />
          </main>
        </div>
        <Footer text='gregolive' link='https://github.com/gregolive'/>
      </div>
    );
  };
};

export default App;
