import { Dispatch, SetStateAction } from 'react'
import './list.scss'
import defaultColors from '../data/defaultColors'

type ListProps = {
  colorList: string[],
  setColorList: Dispatch<SetStateAction<string[]>>;
}

const List = ({ colorList, setColorList }: ListProps) => {
  const handleDelete = (index: number) => {
    const newList = [...colorList];
    newList.splice(index, 1);
    setColorList(newList);
  }

  return (
    <div>
      <ul className='goonline_list-ul'>
        {defaultColors.map((dcolor, index) => (
          <li key={index}>
            <div className='goonline_list-ul-content'>
              <p>
                {dcolor.color.toUpperCase()}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <ul className='goonline_list-ul'>
        {colorList.map((color, index) => (
          <li key={index} onDoubleClick={() => handleDelete(index)}>
            <div className='goonline_list-ul-content'>
              <p>
                {color.toUpperCase()}

              </p>
              <button onClick={() => handleDelete(index)}>
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List