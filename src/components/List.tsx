import React from 'react'
import './list.scss'

type ListProps = {
  colorList: string[]
}

const List = ({ colorList }: ListProps) => {
  const handleDelete = () => {

  }

  return (
    <div className=''>
      <ul className='goonline_list-ul'>
        {colorList.length > 0 ? (colorList.map((color, index) => (
          <li key={index}>
            <div className='goonline_list-ul-content'>
              <p>
                {color}
              </p>
              <button onClick={handleDelete}>
                X
              </button>
            </div>
          </li>
        ))) : (
          <p>No colors found</p>
        )}
      </ul>
    </div>
  )
}

export default List