import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'

type SecondFormProps = {
  colorList: string[],
  setColorList: Dispatch<SetStateAction<string[]>>;
}

const SecondForm = ({ colorList, setColorList }: SecondFormProps) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.toLowerCase())
    setColorList(filteredColorList)
  }

  const filteredColorList = colorList.filter((color) =>
    color.toLowerCase().includes(searchValue)
  );

  return (
    <form>
      <label htmlFor="searchInput">Szukaj koloru</label>
      <input type="text" id='searchInput' placeholder="np. #ffffff" maxLength={7} value={searchValue}
        onChange={handleSearchChange} />
    </form>
  )
}

export default SecondForm