import { Dispatch, SetStateAction, useState } from 'react';
import './forms.scss';

interface SecondFormProps {
  colorList: string[];
  setColorList: Dispatch<SetStateAction<string[]>>;
}

interface FilterState {
  red: boolean;
  green: boolean;
  blue: boolean;
  saturation: boolean;
}

const SecondForm = ({ colorList, setColorList }: SecondFormProps) => {
  const [filterState, setFilterState] = useState<FilterState>({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilterState((prevState) => ({ ...prevState, [name]: checked }));
  };

  const filterColors = (colors: string[]): string[] => {
    return colors.filter((color) => {
      const [r, g, b] = color.match(/\w\w/g)!.map((c) => parseInt(c, 16));
      const [h, s, l] = rgbToHsl(r, g, b);
      return (
        (!filterState.red || r > 127) &&
        (!filterState.green || g > 127) &&
        (!filterState.blue || b > 127) &&
        (!filterState.saturation || s > 50)
      );
    });
  };

  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h: number, s: number, l: number = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; 
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0; 
      }
      h /= 6;
    }
  
    return [h, s * 100, l * 100] as [number, number, number];
  };
  

  const filteredColors = filterColors(colorList);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setColorList(filteredColors);
  };

  return (
    <form onSubmit={handleSubmit} className="goonline_secondForm">
      <label htmlFor="redCheckbox">
        Red {'>'} 50%
        <input
          type="checkbox"
          id="redCheckbox"
          name="red"
          checked={filterState.red}
          onChange={handleFilterChange}
        />
      </label>
      <label htmlFor="greenCheckbox">
        Green {'>'} 50%
        <input
          type="checkbox"
          id="greenCheckbox"
          name="green"
          checked={filterState.green}
          onChange={handleFilterChange}
        />
      </label>
      <label htmlFor="blueCheckbox">
        Blue {'>'} 50%
        <input
          type="checkbox"
          id="blueCheckbox"
          name="blue"
          checked={filterState.blue}
          onChange={handleFilterChange}
        />
      </label>
      <label htmlFor="saturationCheckbox">
        Saturation {'>'} 50%
        <input
          type="checkbox"
          id="saturationCheckbox"
          name="saturation"
          checked={filterState.saturation}
          onChange={handleFilterChange}
        />
      </label>
      <button type="submit" className="goonline_secondForm__button">
        Filter
      </button>
    </form>
  );
};

export default SecondForm;
