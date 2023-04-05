import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

interface FirstFormProps {
  color: string;
  setColor: (color: string) => void;
  setColorList: Dispatch<SetStateAction<string[]>>;
}

const FirstForm = ({ color, setColor, setColorList }: FirstFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputIsValid(color)) {
      setColorList((prevColorList) => [...prevColorList, color]);
      setColor('');
    }
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    if (newColor.length <= 7 && /^[a-fA-F0-9#]*$/.test(newColor)) {
      setColor(newColor.replace(/[^a-fA-F0-9#]/g, '').toLowerCase());
    }
  };

  const inputIsValid = (value: string): boolean => {
    return /^#[a-fA-F0-9]{6}$/.test(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="colorInput" className="">
        Nazwa Koloru
      </label>
      <input
        id="colorInput"
        type="text"
        className=""
        placeholder="wpisz wybrany kolor"
        value={color}
        onChange={handleColorChange}
        maxLength={7}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FirstForm;
