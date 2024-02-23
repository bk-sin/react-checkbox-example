import React, { useCallback, useState } from "react";
import "./App.css";

interface Country {
  id: number;
  name: string;
  isSelected: boolean;
}

interface CountryItemProps {
  country: Country;
  onToggle: (id: number) => void;
}

interface AppProps {}

const initialCountries: Country[] = [
  { id: 1, name: "India", isSelected: false },
  { id: 2, name: "USA", isSelected: false },
  { id: 3, name: "France", isSelected: false },
];

const CountryItem = React.memo<CountryItemProps>(({ country, onToggle }) => (
  <li key={country.id}>
    <label>
      <input
        type="checkbox"
        checked={country.isSelected}
        onChange={() => onToggle(country.id)}
      />
      {country.name}
    </label>
  </li>
));

const App: React.FC<AppProps> = () => {
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [selectAll, setSelectAll] = useState(false);

  const handleCountryToggle = useCallback((id: number) => {
    setCountries((prevCountries) => {
      const updatedCountries = prevCountries.map((country) =>
        country.id === id
          ? { ...country, isSelected: !country.isSelected }
          : country
      );
      const newSelectAll = updatedCountries.every(
        (country) => country.isSelected
      );
      setSelectAll(newSelectAll);
      return updatedCountries;
    });
  }, []);

  const handleSelectAllToggle = useCallback(() => {
    setCountries((prevCountries) =>
      prevCountries.map((country) => ({ ...country, isSelected: !selectAll }))
    );
    setSelectAll((prevSelectAll) => !prevSelectAll);
  }, [selectAll]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAllToggle}
        />
        Select All
      </label>
      <ul>
        {countries.map((country) => (
          <CountryItem
            key={country.id}
            onToggle={handleCountryToggle}
            country={country}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
