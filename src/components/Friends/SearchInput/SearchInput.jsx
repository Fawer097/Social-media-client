import React from 'react';
import GenderSelect from '../GenderSelect/GenderSelect';

const SearchInput = (props) => {
  return (
    <div className="w-full flex justify-between items-center border-b border-gray-200 mb-4 h-10">
      <input
        type="search"
        placeholder={props.placeholder}
        className="w-1/3 h-3/4 px-6 outline-none"
        onChange={(event) => props.searchQuery(event.target.value)}
      />
      <GenderSelect genderQuery={props.genderQuery} />
    </div>
  );
};

export default SearchInput;
