import React from 'react';
import './App.css';
import FirstForm from './components/FirstForm';
import List from './components/List';
import SecondForm from './components/secondForm';

function App() {
  return (
    <div className="App">
      <FirstForm/>
      <SecondForm/>
      <List/>
    </div>
  );
}

export default App;
