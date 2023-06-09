import { ChangeEvent, Component, Dispatch, FormEvent, SetStateAction } from 'react';
import './forms.scss';
import { initialColors } from '../App';

interface FirstFormProps {
  color: string;
  setColor: (color: string) => void;
  setColorList: Dispatch<SetStateAction<string[]>>;
  colorList: string[];
}

interface FirstFormState {}

class FirstForm extends Component<FirstFormProps, FirstFormState> {
  componentDidMount() {
    const getLocalStorage: string | null = localStorage.getItem('colors');
    const parsedLocalStorage: string[] = getLocalStorage ? JSON.parse(getLocalStorage) : [];
    if (getLocalStorage) {
      this.props.setColorList([...initialColors, ...parsedLocalStorage]);
    }
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>, passedColor: string) => {
    event.preventDefault();
    const { setColorList, colorList } = this.props;
    if (colorList.includes(passedColor)) return;
    if (this.inputIsValid(passedColor)) {
      setColorList((prevColorList) => [...prevColorList, passedColor]);
      const getLocalStorage: string | null = localStorage.getItem('colors');
      const parsedLocalStorage: string[] = getLocalStorage ? JSON.parse(getLocalStorage) : [];
      this.props.setColor('');
      if (getLocalStorage) {
        return localStorage.setItem('colors', JSON.stringify([...parsedLocalStorage, passedColor]));
      }
      localStorage.setItem('colors', JSON.stringify([passedColor]));
    }
  };

  handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    const { setColor } = this.props;
    if (newColor.length <= 7 && /^[a-fA-F0-9#]*$/.test(newColor)) {
      const verifiedColor = newColor.replace(/[^a-fA-F0-9#]/g, '').toLowerCase();
      if (verifiedColor.indexOf('#') === 0 || verifiedColor.indexOf('#') === -1) {
        setColor(verifiedColor);
      } else if (verifiedColor.indexOf('#') > 0) {
        setColor(`#${verifiedColor.replace('#', '')}`);
      }
    }
  };

  inputIsValid = (value: string): boolean => {
    return /^#[a-fA-F0-9]{6}$/.test(value);
  };

  render() {
    const { color } = this.props;
    return (
      <form onSubmit={(e) => this.handleSubmit(e, color)} className="goonline_firstForm">
        <label htmlFor="colorInput">Nazwa Koloru</label>
        <section>
          <input
            id="colorInput"
            type="text"
            placeholder="wpisz wybrany kolor"
            value={color}
            onChange={this.handleColorChange}
            maxLength={7}
          />
          <button type="submit">Dodaj</button>
        </section>
      </form>
    );
  }
}

export default FirstForm;
