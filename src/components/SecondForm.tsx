import React from 'react'

type SecondFormProps = {}

const SecondForm = (props: SecondFormProps) => {
  return (
    <form>
      <label htmlFor="searchInput">Szukaj koloru</label>
      <input type="text" id='searchInput' placeholder="np. #ffffff" maxLength={7} />
    </form>
  )
}

export default SecondForm