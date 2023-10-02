import React, { useEffect, useState } from "react";
import { useFocusTrap } from "../../hook/useFocusTrap";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

interface AutocompleteProps {
  defaultText: string;
  suggestions: string[];
  label: string;
  onSelect: (str: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  defaultText,
  suggestions,
  onSelect,
  label,
}) => {
  const [query, setQuery] = useState(defaultText);
  const [display, setDisplay] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const inputRef = useFocusTrap();

  useEffect(() => {
    setQuery(defaultText);
  }, [defaultText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setDisplay(true);
    setQuery(newQuery);

    const filtered: string[] = suggestions.filter((item: string) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSelect = (selected: string) => {
    setQuery(selected);
    onSelect(selected);
    setFilteredSuggestions([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setDisplay(!display);
      onSelect(query);
    }
  };

  return (
    <div className="flex flex-col screens:p-6 pb-2 text-left">
      <label className="text-base font-semibold mb-3">{label}</label>
      <div className="bg-white p-2 rounded-lg border-2 border-gray-200 flex flex-row justify-between relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-3/4"
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
        />
        {display ? (
          <button onClick={() => setDisplay(false)}>
            <KeyboardArrowUp />
          </button>
        ) : (
          <button onClick={() => setDisplay(true)}>
            {" "}
            <KeyboardArrowDown />
          </button>
        )}
      </div>
      {display && (
        <div>
          <ul
            id="autocomplete-list"
            role="listbox"
            ref={inputRef as unknown as React.RefObject<HTMLUListElement>}
            className="bg-white screens:max-h-56 max-h-24 overflow-y-auto absolute z-1 w-1/5 rounded-md border-2 border-gray-200"
          >
            {filteredSuggestions.map((item, index) => (
              <li
                key={index}
                role="option"
                aria-selected={true}
                onMouseDown={() => {
                  if (item !== "Russian Ruble") {
                    handleSelect(item);
                  }
                  setDisplay(false);
                }}
                onClick={() => {
                  if (item !== "Russian Ruble") {
                    handleSelect(item);
                  }
                  setDisplay(false);
                }}
                tabIndex={item === "Russian Ruble" ? -1 : 0}
                className={`ml-2 ${
                  item === "Russian Ruble"
                    ? "text-gray-400 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
