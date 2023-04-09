import { Dispatch, SetStateAction } from 'react'
import './list.scss'
import { initialColors } from '../App'
type ListProps = {
  colorList: string[],
  setColorList: Dispatch<SetStateAction<string[]>>;
}

const List = ({ colorList, setColorList }: ListProps) => {
  const handleDelete = (index: number, color: string) => {
    const newList = [...colorList];

    newList.splice(index, 1);


    localStorage.getItem('colors')
    const getLocalStorage: string | null = localStorage.getItem('colors')
    const parsedLocalStorage: string[] = getLocalStorage ? JSON.parse(getLocalStorage) : []

    if (getLocalStorage) {
      const excludedColor = parsedLocalStorage.filter((item) => item !== color)
      localStorage.setItem('colors', JSON.stringify(excludedColor))
    }
    setColorList(newList);
  }

  const hexToRGB = (hex: string) => {
    hex = hex.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return 'RGB(' + r + ', ' + g + ', ' + b + ')';
  }

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
              <p>
                {hexToRGB(color)}
              </p>
              {!initialColors.includes(color) && <button onClick={() => handleDelete(index, color)}>
                X
              </button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List