
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function SearchableInput() {
  const [searchQuery, setSearchQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [region, setRegion] = React.useState();
  
  const loadOptions = async (inputValue) => {
    try {
      if (inputValue) {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/search.json?key=9ec95a8b37344ad8944113501231010&q=${inputValue}`
        );
        const data = response.data;

        if (data) {
          const mappedOptions = data.map((item) => ({
            value: item.region, // Adjust as needed
            label: item.name, // Adjust as needed
          }));
          setOptions(mappedOptions);
        }
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  return (
    <Select
      className="search-select"
      options={options}
      onInputChange={(inputValue) => {
        setSearchQuery(inputValue);
        loadOptions(inputValue); // Load options as the user types
      }}
      onChange={(selectedOption) => {
        setSearchQuery(selectedOption.value);
        setRegion(selectedOption.value);
      }}
      placeholder="Search Location"
      isSearchable
    />
  );
}

export default SearchableInput;
