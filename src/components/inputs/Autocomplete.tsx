import React, { useEffect, useState } from "react";
import { useFocusTrap } from "../../hook/useFocusTrap";

interface AutocompleteProps {
  defaultText: string;
  suggestions: [];
  label: string;
  onSelect: any;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  defaultText,
  suggestions,
  onSelect,
  label,
}) => {
  const [query, setQuery] = useState(defaultText);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const inputRef = useFocusTrap();

  useEffect(() => {
    setQuery(defaultText);
  }, [defaultText]);

  const handleInputChange = (event: any) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const filtered = suggestions.filter((item: any) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSelect = (selected: any) => {
    setQuery(selected);
    onSelect(selected);
    setFilteredSuggestions([]);
  };

  return (
    <div className="flex flex-col p-6 text-left">
      <label className="text-base font-semibold mb-3">{label}</label>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
      />
      {filteredSuggestions.length > 0 && (
        <ul
          id="autocomplete-list"
          role="listbox"
          ref={inputRef as unknown as React.RefObject<HTMLUListElement>}
        >
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              role="option"
              aria-selected={item}
              onMouseDown={() => handleSelect(item)}
              onClick={() => handleSelect(item)}
              tabIndex={0}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
