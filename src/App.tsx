import React, { useState } from 'react';
import './App.scss';
import FirstForm from './components/FirstForm';
import List from './components/List';
import SecondForm from './components/SecondForm';

export const initialColors: string[] = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF']

const App = () => {
  const [color, setColor] = useState('');
  const [colorList, setColorList] = useState<string[]>(initialColors);
  
  return (
    <div className="App">
      <FirstForm color={color} setColor={setColor} setColorList={setColorList} colorList={colorList} />
      <SecondForm colorList={colorList} setColorList={setColorList}/>
      <List colorList={colorList} setColorList={setColorList}/>
    </div>
  );
}

export default App;