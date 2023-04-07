import { Component, ChangeEvent, Dispatch, SetStateAction } from 'react';
import './forms.scss';

type SecondFormProps = {
  colorList: string[],
  setColorList: Dispatch<SetStateAction<string[]>>;
}

type SecondFormState = {
  searchValue: string;
}

class SecondForm extends Component<SecondFormProps, SecondFormState> {
  constructor(props: SecondFormProps) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    const { setColorList, colorList } = this.props;
    const filteredColorList = colorList.filter((color) =>
      color.toLowerCase().includes(searchValue)
    );
    this.setState({ searchValue });
    setColorList(filteredColorList);
  }

  render() {
    const { searchValue } = this.state;
    return (
      <form className='goonline_secondForm'>
        <label htmlFor="searchInput">Szukaj koloru</label>
        <input type="text" id='searchInput' placeholder="np. #ffffff" maxLength={7} value={searchValue}
          onChange={this.handleSearchChange} />
      </form>
    );
  }
}

export default SecondForm;