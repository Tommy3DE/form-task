import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect } from 'react';
import './forms.scss'
import { initialColors } from '../App';
interface FirstFormProps {
  color: string;
  setColor: (color: string) => void;
  setColorList: Dispatch<SetStateAction<string[]>>;
  colorList: string[]
}

const FirstForm = ({ color, setColor, setColorList, colorList }: FirstFormProps) => {
  
  useEffect(()=> {
    const getLocalStorage: string | null = localStorage.getItem('colors')
    const parsedLocalStorage: string[] = getLocalStorage ? JSON.parse(getLocalStorage) : []
    if (getLocalStorage){
      setColorList([...initialColors, ...parsedLocalStorage])
    }
    
  },[])

  const handleSubmit = (event: FormEvent<HTMLFormElement>, passedColor: string) => {
    event.preventDefault();
    if(colorList.includes(passedColor)) return
    if (inputIsValid(passedColor)) {
      setColorList((prevColorList) => [...prevColorList, passedColor]);
      const getLocalStorage: string | null = localStorage.getItem('colors')
      const parsedLocalStorage: string[] = getLocalStorage ? JSON.parse(getLocalStorage) : []
      setColor('');
      if(getLocalStorage){
        return localStorage.setItem('colors', JSON.stringify([...parsedLocalStorage, passedColor]))
      }
      localStorage.setItem('colors', JSON.stringify([passedColor]))
      
    }
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    if (newColor.length <= 7 && /^[a-fA-F0-9#]*$/.test(newColor)) {
      const verifiedColor = newColor.replace(/[^a-fA-F0-9#]/g, '').toLowerCase();
      if (verifiedColor.indexOf('#') === 0 || verifiedColor.indexOf('#') === -1) {
        setColor(verifiedColor);
      } else if (verifiedColor.indexOf('#') > 0) {
        setColor(`#${verifiedColor.replace('#', '')}`);
      }
    }
  };

  const inputIsValid = (value: string): boolean => {
    return /^#[a-fA-F0-9]{6}$/.test(value);
  };


  return (
    <form onSubmit={(e) => handleSubmit(e, color)} className='goonline_firstForm'>
      <label htmlFor="colorInput">
        Nazwa Koloru
      </label>
      <div>
        <input
          id="colorInput"
          type="text"
          placeholder="wpisz wybrany kolor"
          value={color}
          onChange={handleColorChange}
          maxLength={7}
        />
        <button type="submit">Dodaj</button>
      </div>
    </form>
  );
};

export default FirstForm;
