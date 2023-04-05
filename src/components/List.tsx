import React from 'react'

type ListProps = {
  colorList: string[]
}

const List = ({ colorList }: ListProps) => {
  return (
    <div className=''>
      <ul>
        {colorList.map((color) => (
          <li>
            {color}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List