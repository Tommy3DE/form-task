import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect } from 'react';
import './forms.scss'

interface FirstFormProps {
  color: string;
  setColor: (color: string) => void;
  setColorList: Dispatch<SetStateAction<string[]>>;
}

const FirstForm = ({ color, setColor, setColorList }: FirstFormProps) => {
  useEffect(() => {
    getSavedColors()
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputIsValid(color)) {
      setColorList((prevColorList) => [...prevColorList, color]);
      setColor('');
      localStorage.setItem('colors', JSON.stringify([...getSavedColors(), color]));
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

  const getSavedColors = (): string[] => {
    const savedColorsString = localStorage.getItem('colors');
    return savedColorsString ? JSON.parse(savedColorsString) : [];

  };

  return (
    <form onSubmit={handleSubmit} className='goonline_firstForm'>
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
