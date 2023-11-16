"use client";

import { Location } from "@prisma/client";
import axios from "axios";
import { useState, useEffect } from "react";

export interface Option {
  label: string;
  value: string;
}

interface CountrySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    axios.get("/api/locations").then((response) => {
      setOptions(
        response.data.map((location: Location) => ({
          label: location.label,
          value: location.id,
        }))
      );
    });
  }, []);

  return (
    <div>
      <label
        htmlFor="location"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Location
      </label>
      <select
        id="location"
        name="location"
        value={value}
        onChange={(option) => {
          onChange(option.target.value);
        }}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
