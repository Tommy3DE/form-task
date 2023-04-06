import React, { useState } from 'react';
import './App.scss';
import FirstForm from './components/FirstForm';
import List from './components/List';
import SecondForm from './components/SecondForm';

function App() {
  const [color, setColor] = useState('');
  const [colorList, setColorList] = useState<string[]>([]);

  return (
    <div className="App">
      <FirstForm color={color} setColor={setColor} setColorList={setColorList} />
      <SecondForm colorList={colorList} setColorList={setColorList}/>
      <List colorList={colorList} setColorList={setColorList}/>
    </div>
  );
}

export default App;
