import React from 'react'

type ListProps = {
  colorList: string[]
}

const List = ({ colorList }: ListProps) => {
  const handleDelete = () => {

  }

  return (
    <div className=''>
      <ul className=''>
        {colorList.map((color, index) => (
          <li key={index} className=''>
            <p>
            {color}
            </p>
            <button onClick={handleDelete}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List