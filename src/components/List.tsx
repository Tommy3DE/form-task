import {Dispatch, SetStateAction} from 'react'
import './list.scss'

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
    <div className=''>
      <ul className='goonline_list-ul'>
        {colorList.length > 0 ? (colorList.map((color, index) => (
          <li key={index} onDoubleClick={()=> handleDelete(index)}>
            <div className='goonline_list-ul-content'>
              <p>
                {color.toUpperCase()}
              </p>
              <button onClick={() => handleDelete(index)}>
                X
              </button>
            </div>
          </li>
        ))) : (
          <p>Brak kolorów w bazie</p>
        )}
      </ul>
    </div>
  )
}

export default List
