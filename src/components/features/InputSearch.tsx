import React, { useState } from 'react';
import { validateSearchInput } from '../../utils/validation';
import searchIcon from '../../img/search.png';

interface InputSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputSearch: React.FC<InputSearchProps> = ({
  value,
  onChange,
  placeholder = "Search Pokémon..."
}) => {
  const [error, setError] = useState<string>('');

  const handleInputChange = (inputValue: string) => {
    // Validate the input
    const validation = validateSearchInput(inputValue);

    if (validation.isValid) {
      setError('');
      onChange(inputValue);
    } else {
      setError(validation.error || 'Invalid input');
    }
  };

  return (
    <div className="search-container">
      <div className={`search-input-wrapper ${error ? 'has-error' : ''}`}>
        <img
          src={searchIcon}
          alt="Search"
          className="search-icon"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
          maxLength={50}
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              setError('');
            }}
            className="clear-button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      {error && (
        <div className="input-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputSearch;