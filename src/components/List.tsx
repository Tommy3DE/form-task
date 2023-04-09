import React, { Component } from 'react';
import { Dispatch, SetStateAction } from 'react';
import './list.scss';
import { initialColors } from '../App';

type ListProps = {
  colorList: string[],
  setColorList: Dispatch<SetStateAction<string[]>>;
};

type ListState = {};

class List extends Component<ListProps, ListState> {
  handleDelete = (index: number, color: string) => {
    const { colorList, setColorList } = this.props;

    const newList = [...colorList];
    newList.splice(index, 1);

    localStorage.getItem('colors');
    const getLocalStorage: string | null = localStorage.getItem('colors');
    const parsedLocalStorage: string[] = getLocalStorage ? JSON.parse(getLocalStorage) : [];

    if (getLocalStorage) {
      const excludedColor = parsedLocalStorage.filter((item) => item !== color);
      localStorage.setItem('colors', JSON.stringify(excludedColor));
    }

    setColorList(newList);
  };

  hexToRGB = (hex: string) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return 'RGB(' + r + ', ' + g + ', ' + b + ')';
  };

  render() {
    const { colorList } = this.props;

    return (
      <div>
        <ul className='goonline_list-ul'>
          {colorList.map((color, index) => (
            <li key={index}>
              <div className='goonline_list-ul-content'>
                <p>
                  <input type='color' value={color} disabled={true} />
                  {color.toUpperCase()}
                </p>
                <p>{this.hexToRGB(color)}</p>
                {!initialColors.includes(color) && (
                  <button onClick={() => this.handleDelete(index, color)}>X</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
